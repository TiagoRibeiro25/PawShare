const { query } = require("express-validator");

/**
 * Returns an array of validation rules for the get adoption feed endpoint
 * @returns {Array} An array of validation rules
 */

function validator() {
	return [
		query("search")
			.isString()
			.isLength({ min: 3, max: 70 })
			.withMessage("Invalid search query"),
	];
}

module.exports = validator;
