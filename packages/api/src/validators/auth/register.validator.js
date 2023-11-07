const { body } = require("express-validator");
const countries = require("../../data/countries.json");

/**
 * Returns an array of validation rules for the register route.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		body("display_name")
			.isString()
			.isLength({ min: 3 })
			.withMessage("Display name must be at least 3 characters long"),

		body("email").isEmail().withMessage("Email must be a valid email address"),

		body("password")
			.isString()
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters long"),

		body("type")
			.isString()
			.isIn(["user", "organization"])
			.withMessage("Invalid account type"),

		body("country")
			.isString()
			.isIn(countries.map((country) => country.code))
			.withMessage("Invalid country"),
	];
}

module.exports = validator;
