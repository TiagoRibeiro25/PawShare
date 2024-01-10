const utils = require("../../utils");
const db = require("../../db");
const { Op } = require("sequelize");

/**
 * Delete all expired sitting requests.
 * @param {import("express").Request} _req - The Express Request object (unused).
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function deleteExpiredSittingRequests(_req, res) {
	try {
		// Delete all sitting requests where the start_date is less than the current date and is_closed is false
		const result = await db.mysql.Sitting.destroy({
			where: {
				start_date: {
					[Op.lt]: new Date(),
				},
				is_closed: false,
			},
		});

		utils.handleResponse(
			res,
			utils.http.StatusOK,
			`Deleted ${result} expired sitting requests successfully.`,
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = deleteExpiredSittingRequests;
