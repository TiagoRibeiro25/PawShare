const utils = require("../../utils");
const db = require("../../db");
const config = require("../../config");

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
async function getCreatedAdoptions(req, res) {
	try {
		/** @type {QueryOptions} */
		const {
			page = config.pagination.adoptions.created.defaultPage,
			limit = config.pagination.adoptions.created.defaultLimit,
		} = req.query;

		const adoptions = await db.mysql.Adoption.findAndCountAll({
			limit,
			offset: (page - 1) * limit,
			order: [["createdAt", "DESC"]],
			attributes: ["id", "is_closed", "createdAt", "updatedAt"],
			where: {
				owner_id: req.userId,
			},
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
		});

		if (adoptions.rows.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No adoptions found");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Adoptions retrieved successfully", {
			adoptions: adoptions.rows.map((adoption) => {
				return {
					id: adoption.id,
					status: adoption.is_closed ? "completed" : "pending",
					animal: {
						id: adoption.animal.id,
						name: adoption.animal.name,
						picture: adoption.animal.picture?.provider_url || null,
					},
					created_at: adoption.createdAt,
					updated_at: adoption.updatedAt,
				};
			}),
			total: adoptions.count,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getCreatedAdoptions;
