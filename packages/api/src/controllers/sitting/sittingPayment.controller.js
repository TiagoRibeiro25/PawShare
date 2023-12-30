const db = require("../../db");
const utils = require("../../utils");

/**
 * Make payment for a sitting request.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function sittingPayment(req, res) {
	// TODO (any): Not tested

	try {
		const { sittingId } = req.params;

		const sitting = await db.mysql.Sitting.findOne({
			attributes: ["id", "is_closed", "owner_id", "coins"],
			where: {
				id: +sittingId,
				is_closed: true,
			},
			include: [
				{
					model: db.mysql.UsersList,
					as: "users_lists",
					attributes: ["user_id"],
					where: {
						is_confirmed: true,
					},
					include: [
						{
							model: db.mysql.User,
							as: "user",
							attributes: ["id", "coins"],
						},
					],
				},
			],
		});

		if (!sitting) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Sitting not found");
			return;
		}

		if (sitting.owner_id !== req.userId) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You are not the owner of this sitting request",
			);

			return;
		}

		const user = sitting.users_lists[0].user;

		const transaction = await db.mysql.sequelize.transaction();

		await db.mysql.User.update(
			{
				coins: user.coins + sitting.coins,
			},
			{
				where: {
					id: user.id,
				},
			},
			transaction,
		);

		await db.mysql.Sitting.update(
			{
				paid: true,
			},
			{
				where: {
					id: sitting.id,
				},
			},
			transaction,
		);

		await transaction.commit();

		utils.handleResponse(res, utils.http.StatusOK, "Sitting payment successful");
	} catch (error) {
		utils.handleResponse(res, utils.http.StatusInternalServerError, error.message);
	}
}

module.exports = sittingPayment;
