const utils = require("../../utils");
const store = require("../../data/store.json");
const db = require("../../db");

/**
 * @typedef StoreItem
 * @property {number} id
 * @property {number} price
 */

/**
 * Buys an item from the store
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function buyItem(req, res) {
	try {
		/** @type {number}*/
		const itemId = +req.params.itemId;

		/** @type {"frame" | "banner"}*/
		const itemType = req.query.itemType;

		/** @type {StoreItem | undefined} */
		const item = store[itemType + "s"].find((item) => item.id === itemId);
		if (!item) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Item not found");
			return;
		}

		const user = await db.mysql.User.findByPk(req.userId);

		// Check if the logged user has enough coins to buy the item
		if (user.coins < item.price) {
			utils.handleResponse(res, utils.http.StatusForbidden, "Not enough coins");
			return;
		}

		// Add the item to the user account and decrement the item price from the user coins
		await user.update({
			[itemType + "s"]: JSON.stringify([...JSON.parse(user[itemType + "s"]), itemId]), // "banners" | "frames"
			coins: user.coins - item.price,
		});

		utils.handleResponse(res, utils.http.StatusOK, "Item bought successfully");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = buyItem;
