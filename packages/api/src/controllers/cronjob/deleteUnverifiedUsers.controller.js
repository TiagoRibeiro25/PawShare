const utils = require("../../utils");
const db = require("../../db");
const { Op } = require("sequelize");

/**
 * Delete all unverified users.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function deleteUnverifiedUsers(req, res) {
	try {
		const users = await db.mysql.User.findAll({
			where: {
				is_verified: false,
				createdAt: {
					[Op.lt]: new Date(new Date() - 24 * 60 * 60 * 1000), // 24 hours ago
				},
			},
		});

		// Delete the users
		await Promise.all(
			users.map(async (user) => {
				await user.destroy();
			}),
		);

		utils.handleResponse(
			res,
			utils.http.StatusOK,
			`Deleted ${users.length} unverified users successfully.`,
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = deleteUnverifiedUsers;
