const { param, body } = require("express-validator");

/**
 * Returns an array of validation rules for the resetPassword route.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		param("token").isString().isLength({ min: 10 }).withMessage("Invalid token"),

		body("password")
			.isString()
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters long"),
	];
}

module.exports = validator;
