const { query, param } = require("express-validator");
const config = require("../../config");

/**
 * Returns an array of validation rules for the get candidates endpoint
 * @returns {Array} An array of validation rules
 */
function validator() {
	return [
		param("id").isInt({ min: 1 }).withMessage("Invalid sitting id"),

		query("page")
			.optional()
			.isInt({ min: 1 })
			.toInt()
			.withMessage("Page must be a positive integer"),

		query("limit")
			.optional()
			.isInt({ min: 1, max: config.pagination.adoptions.candidates.maxLimit })
			.toInt()
			.withMessage("Limit must be a positive integer"),
	];
}

module.exports = validator;
