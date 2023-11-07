const { body } = require("express-validator");

/**
 * Returns an array of validation rules for the login route.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		body("email").isEmail().withMessage("Email must be a valid email address"),

		body("password")
			.isString()
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters long"),

		body("remember_me").isBoolean().withMessage("Remember me must be a boolean"),
	];
}

module.exports = validator;