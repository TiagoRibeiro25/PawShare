const utils = require("../../utils");
const db = require("../../db");
const config = require("../../config");

/**
 * @typedef QueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 */

const QUERY_ATTRIBUTES = {
	sitting: [
		"id",
		"is_closed",
		"paid",
		"start_date",
		"end_date",
		"createdAt",
		"updatedAt",
	],
	animal: ["id", "name"],
	picture: ["provider_url"],
	review: ["type"],
};

/**
 * Get the crated sitting requests of the authenticated user.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getCreatedSittings(req, res) {
	try {
		/** @type {QueryOptions} */
		const {
			page = config.pagination.sitting.created.defaultPage,
			limit = config.pagination.sitting.created.defaultLimit,
		} = req.query;

		const sittings = await db.mysql.Sitting.findAndCountAll({
			limit,
			offset: (page - 1) * limit,
			order: [["createdAt", "DESC"]],
			attributes: QUERY_ATTRIBUTES.sitting,
			where: {
				owner_id: req.userId,
			},
			include: [
				{
					model: db.mysql.Animal,
					as: "animal",
					attributes: QUERY_ATTRIBUTES.animal,
					include: [
						{
							model: db.mysql.Picture,
							as: "picture",
							attributes: QUERY_ATTRIBUTES.picture,
						},
					],
				},
				{
					model: db.mysql.Review,
					as: "review",
					attributes: QUERY_ATTRIBUTES.review,
				},
			],
		});

		if (sittings.rows.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No sitting requests found");
			return;
		}

		utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Sitting requests retrieved successfully",
			{
				sittings: sittings.rows.map((sitting) => {
					// _____________Handle current sitting status_____________
					let status = sitting.is_closed ? "completed" : "pending";

					const isSittingHappeningNow =
						sitting.start_date < new Date() && sitting.end_date > new Date();

					if (sitting.is_closed && isSittingHappeningNow) {
						status = "ongoing";
					}

					status = sitting.paid ? "paid" : status;

					// _________________Handle review status__________________
					let canReview = status === "completed" || status === "paid";

					if (canReview) {
						// Both reviews are already done
						if (sitting.review?.length === 2) {
							canReview = false;
						}

						// Check if the only review is from the owner (the logged in user)
						else if (sitting.review?.length === 1) {
							canReview = sitting.review[0].type === "owner";
						}

						// No reviews yet
						else {
							canReview = true;
						}
					}

					return {
						id: sitting.id,
						status,
						can_review: canReview,
						animal: {
							id: sitting.animal.id,
							name: sitting.animal.name,
							picture: sitting.animal.picture?.provider_url || null,
						},
						created_at: sitting.createdAt,
						updated_at: sitting.updatedAt,
					};
				}),
				total: sittings.count,
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getCreatedSittings;
