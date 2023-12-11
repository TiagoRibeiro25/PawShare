const { query, body } = require("express-validator");

/**
 * Returns an array of validation rules for the add review request.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		query("type")
			.isString()
			.isIn(["adoption", "sitting"])
			.withMessage("The type must be either 'adoption' or 'sitting'."),

		body("id").isInt({ min: 1 }).withMessage("The id must be a positive integer."),

		body("rating")
			.isInt({ min: 1, max: 5 })
			.withMessage("The rating must be between 1 and 5."),

		body("comment")
			.optional()
			.isString()
			.isLength({ min: 8, max: 255 })
			.withMessage("The comment must be between 8 and 255 characters."),
	];
}

module.exports = validator;
