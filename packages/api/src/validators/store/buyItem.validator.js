const { param, query } = require("express-validator");

/**
 * Returns an array of validation rules for the buy item route.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		param("itemId").isInt({ min: 1 }).withMessage("Invalid item"),
		query("itemType")
			.isString()
			.isIn(["banner", "frame"])
			.withMessage("Invalid item type"),
	];
}

module.exports = validator;
