const utils = require("../../utils");
const db = require("../../db");
const { Op } = require("sequelize");

/**
 * Delete all unverified users.
 * @param {import("express").Request} _ - The Express Request object (unused).
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function deleteUnverifiedUsers(_, res) {
	try {
		const result = await db.mysql.User.destroy({
			where: {
				is_verified: false,
				createdAt: {
					[Op.lt]: new Date(new Date() - 24 * 60 * 60 * 1000), // 24 hours ago
				},
			},
		});

		utils.handleResponse(
			res,
			utils.http.StatusOK,
			`Deleted ${result} unverified users successfully.`,
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = deleteUnverifiedUsers;
