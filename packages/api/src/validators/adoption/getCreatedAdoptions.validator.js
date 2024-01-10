const { query } = require("express-validator");
const config = require("../../config");

/**
 * Returns an array of validation rules for the get the adoptions created endpoint
 * @returns {Array} An array of validation rules
 */

function validator() {
	return [
		query("page")
			.optional()
			.isInt({ min: 1 })
			.toInt()
			.withMessage("Page must be a positive integer"),

		query("limit")
			.optional()
			.isInt({ min: 1, max: config.pagination.adoptions.created.maxLimit })
			.toInt()
			.withMessage("Limit must be a positive integer"),
	];
}

module.exports = validator;
