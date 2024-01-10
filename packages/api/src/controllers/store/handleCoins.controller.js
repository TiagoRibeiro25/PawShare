const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef HandleCoinsQuery
 * @property {"buy" | "redeem"} action - The action to perform (buy or redeem)
 * @property {number | string} quantity - The quantity to buy or redeem
 */

/**
 * Buy / Redeem Coins
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function handleCoins(req, res) {
	try {
		/** @type {HandleCoinsQuery} */
		const { action, quantity } = req.query;

		const user = await db.mysql.User.findByPk(req.userId, {
			attributes: ["id", "coins"],
		});

		if (action === "redeem" && user.coins < quantity) {
			utils.handleResponse(res, utils.http.StatusBadRequest, "Not enough coins");
			return;
		}

		// If the user has enough coins, decrement the coins by the quantity, or increment if the action is "buy"
		await user[action === "buy" ? "increment" : "decrement"]("coins", {
			by: +quantity,
		});

		utils.handleResponse(res, utils.http.StatusOK, "Transaction completed");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = handleCoins;
