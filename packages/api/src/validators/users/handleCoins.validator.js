const { query } = require("express-validator");

/**
 * Returns an array of validation rules for the buy/redeem coins endpoint.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		query("action")
			.isString()
			.isIn(["buy", "redeem"])
			.withMessage("The action query parameter must be either 'buy' or 'redeem'"),

		query("quantity")
			.isInt({ min: 1 })
			.withMessage("The quantity query parameter must be a positive integer"),
	];
}

module.exports = validator;
