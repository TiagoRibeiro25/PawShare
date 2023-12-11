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
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
			.withMessage(
				"Password must contain at least one lowercase letter, one uppercase letter, one digit and be at least 8 characters long",
			),
	];
}

module.exports = validator;
