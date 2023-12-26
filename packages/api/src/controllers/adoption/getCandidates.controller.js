const utils = require("../../utils");
const db = require("../../db");
const config = require("../../config");

/**
 * @typedef QueryOptions
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 */

/**
 * Get the list of candidates for an adoption
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getCandidates(req, res) {
	try {
		/** @type {QueryOptions} */
		const {
			page = config.pagination.adoptions.candidates.defaultPage,
			limit = config.pagination.adoptions.candidates.defaultLimit,
		} = req.query;

		const transaction = await db.mysql.sequelize.transaction();

		const adoption = await db.mysql.Adoption.findOne({
			attributes: ["id", "owner_id"],
			where: {
				id: +req.params.id,
			},
			include: [
				{
					model: db.mysql.UsersList,
					as: "users_lists",
					attributes: ["id", "is_confirmed"],
					limit,
					offset: (page - 1) * limit,
					include: [
						{
							model: db.mysql.User,
							as: "user",
							attributes: ["id", "display_name"],
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
			transaction,
		});

		// Count all candidates
		const total = await db.mysql.UsersList.count({
			where: {
				adoption_id: +req.params.id,
			},
			transaction,
		});

		await transaction.commit();

		if (!adoption) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Adoption not found");
			return;
		}

		// Check if the logged user is the owner of the adoption
		if (adoption.owner_id !== req.userId) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You are not the owner of this adoption",
			);
			return;
		}

		const candidates = adoption.toJSON().users_lists;

		if (!candidates || candidates.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No candidates found");
			return;
		}

		// Check if the adoption is already confirmed
		if (candidates.some((candidate) => candidate.is_confirmed)) {
			utils.handleResponse(res, utils.http.StatusConflict, "Adoption already confirmed");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Candidates found", {
			candidates: candidates.map((candidate) => {
				return {
					...candidate.user,
					picture:
						candidate.user.picture?.provider_url ||
						utils.pictures.getUserPictureUrl(candidate.user.display_name),
				};
			}),
			total,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getCandidates;
