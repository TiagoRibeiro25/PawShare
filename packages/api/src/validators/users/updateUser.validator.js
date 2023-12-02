const { body } = require("express-validator");
const countries = require("../../data/countries.json");
const utils = require("../../utils");

const POSSIBLE_FIELDS = [
	"display_name",
	"email",
	"country",
	"description",
	"selected_frame",
	"selected_banner",
	"picture",
];

/**
 * Returns an array of validation rules for the update user route.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [
		body("display_name")
			.optional()
			.isString()
			.isLength({ min: 3 })
			.withMessage("Display name must be at least 3 characters long"),

		body("email").optional().isEmail().withMessage("Email must be a valid email address"),

		body("country")
			.optional()
			.isString()
			.isIn(countries.map((country) => country.code))
			.withMessage("Invalid country"),

		body("description")
			.optional()
			.isString()
			.isLength({ min: 3 })
			.withMessage("Description must be at least 10 characters long"),

		body("selected_frame")
			.optional()
			.isInt()
			.custom((value) => value > 0)
			.withMessage("Invalid frame"),

		body("selected_banner")
			.optional()
			.isInt()
			.custom((value) => value > 0)
			.withMessage("Invalid banner"),

		body("picture")
			.optional()
			.isString()
			.custom((value) => utils.validateData.base64Image(value))
			.withMessage("Invalid picture"),

		// If the body does not contain any of the above fields, throw an error
		body()
			.custom((value) => {
				const fields = Object.keys(value);
				return fields.some((field) => POSSIBLE_FIELDS.includes(field));
			})
			.withMessage("You must provide at least one field to update"),

		// If the body contains a field that is not in the POSSIBLE_FIELDS array, throw an error
		body()
			.custom((value) => {
				const fields = Object.keys(value);
				return fields.every((field) => POSSIBLE_FIELDS.includes(field));
			})
			.withMessage("Invalid field"),
	];
}

module.exports = validator;
