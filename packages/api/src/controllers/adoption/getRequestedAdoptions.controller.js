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
 * Get the requested adoptions
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getRequestedAdoptions(req, res) {
	try {
		/** @type {QueryOptions} */
		const {
			page = config.pagination.adoptions.requested.defaultPage,
			limit = config.pagination.adoptions.requested.defaultLimit,
		} = req.query;

		const requests = await db.mysql.UsersList.findAndCountAll({
			limit,
			offset: (page - 1) * limit,
			order: [["createdAt", "DESC"]],
			attributes: ["id", "adoption_id", "is_confirmed"],
			where: {
				user_id: req.userId,
				adoption_id: { [Op.ne]: null },
			},
			include: [
				{
					model: db.mysql.Adoption,
					as: "adoption",
					attributes: ["id", "is_closed", "createdAt", "updatedAt"],
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
						{
							model: db.mysql.Review,
							as: "review",
							attributes: ["id"],
						},
					],
				},
			],
		});

		if (requests.rows.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No requests found");
			return;
		}

		// Organize the data to send to the client
		const requestsWithAdoptions = requests.rows.map((request) => {
			/** @type {"pending" | "accepted" | "rejected"} */
			let status = "pending";
			if (request.adoption.is_closed) {
				status = request.is_confirmed ? "accepted" : "rejected";
			}

			return {
				id: request.id,
				status,
				can_review: status === "accepted" && request.adoption.review === null, // Can review if the adoption is accepted and there is no review yet
				adoption: {
					id: request.adoption.id,
					animal: {
						id: request.adoption.animal.id,
						name: request.adoption.animal.name,
						picture: request.adoption.animal.picture?.provider_url || null,
					},
					created_at: request.adoption.createdAt,
					updated_at: request.adoption.updatedAt,
				},
			};
		});

		utils.handleResponse(res, utils.http.StatusOK, "Requests retrieved successfully", {
			requests: requestsWithAdoptions,
			total: requests.count,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getRequestedAdoptions;
