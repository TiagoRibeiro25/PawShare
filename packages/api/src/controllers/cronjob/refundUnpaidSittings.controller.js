const utils = require("../../utils");
const db = require("../../db");
const { Op } = require("sequelize");

const TIME_INTERVAL = 24 * 60 * 60 * 1000 * 7; // 7 days

/**
 * Refund all unpaid sittings that are older than 7 days.
 * @param {import("express").Request} _req - The Express Request object (unused).
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function refundUnpaidSittings(_req, res) {
	try {
		// Get all unpaid sittings where end_date is older than 7 days
		const sittings = await db.mysql.Sitting.findAll({
			attributes: ["id", "owner_id", "coins"],
			where: {
				paid: false,
				is_closed: true,
				end_date: {
					[Op.lt]: new Date(new Date().getTime() - TIME_INTERVAL),
				},
			},
		});

		const transaction = await db.mysql.sequelize.transaction();

		// For each sitting, give the coins back to the owner and delete the sitting
		for (const sitting of sittings) {
			await db.mysql.User.increment(
				{ coins: sitting.coins },
				{
					where: {
						id: sitting.owner_id,
					},
					transaction,
				},
			);
		}

		await transaction.commit();

		await db.mysql.Sitting.destroy({
			where: {
				id: {
					[Op.in]: sittings.map((sitting) => sitting.id),
				},
			},
		});

		return utils.handleResponse(res, utils.http.StatusSuccess, "Sittings refunded");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = refundUnpaidSittings;
