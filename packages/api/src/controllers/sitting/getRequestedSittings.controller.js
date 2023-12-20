const utils = require("../../utils");
const db = require("../../db");
const config = require("../../config");
const { Op } = require("sequelize");

/**
 * @typedef QueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 */

/**
 * Get the requested sittings
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getRequestedSittings(req, res) {
	// TODO (tiago): Add swagger docs
	// TODO (tiago): Not tested

	try {
		/** @type {QueryOptions} */
		const {
			page = config.pagination.sitting.requested.defaultPage,
			limit = config.pagination.sitting.requested.defaultLimit,
		} = req.query;

		const requests = await db.mysql.UsersList.findAndCountAll({
			limit,
			offset: (page - 1) * limit,
			order: [["createdAt", "DESC"]],
			attributes: ["id", "sitting_id", "is_confirmed"],
			where: {
				user_id: req.userId,
				sitting_id: { [Op.ne]: null },
			},
			include: [
				{
					model: db.mysql.Sitting,
					as: "sitting",
					attributes: ["id", "paid", "is_closed", "createdAt", "updatedAt"],
					include: [
						{
							model: db.mysql.Animal,
							as: "animal",
							attributes: ["id", "name"],
							include: [
								{
									model: db.mysql.Picture,
									as: "picture",
									attributes: ["provider_url"],
								},
							],
						},
					],
				},
			],
		});

		if (requests.rows.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No requests found");
			return;
		}

		const reviews = await db.mysql.Review.findAll({
			where: {
				sitting_id: requests.rows.map((request) => request.sitting.id),
				type: "sitter",
			},
		});

		// Add the reviews to the sittings
		requests.rows.forEach((request) => {
			request.sitting.reviews = reviews.filter(
				(review) => review.sitting_id === request.sitting.id,
			);
		});

		// Organize the data to send to the client
		const requestsWithSittings = requests.rows.map((request) => {
			/** @type {"pending" | "accepted" | "rejected" | "paid"} */
			let status = "pending";

			if (request.sitting.is_closed) {
				if (!request.is_confirmed) {
					status = "rejected";
				} else if (request.sitting.paid) {
					status = "paid";
				} else {
					status = "accepted";
				}
			}

			// Check the status of the sitting and how many reviews are done (max 2)
			let can_review =
				["accepted", "paid"].includes(status) &&
				(request.sitting.reviews?.length === 0 || request.sitting.reviews?.length < 2);

			if (can_review && request.sitting.reviews?.length === 1) {
				// Check who did the existing review (if the user did it, he can't review again)
				can_review = request.sitting.reviews[0].user_id !== req.userId;
			}

			return {
				id: request.id,
				status,
				can_review,
				sitting: {
					id: request.sitting.id,
					animal: {
						id: request.sitting.animal.id,
						name: request.sitting.animal.name,
						picture: request.sitting.animal.picture?.provider_url || null,
					},
					created_at: request.sitting.createdAt,
					updated_at: request.sitting.updatedAt,
				},
			};
		});

		utils.handleResponse(res, utils.http.StatusOK, "Requests retrieved successfully", {
			requests: requestsWithSittings,
			total: requests.count,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getRequestedSittings;
