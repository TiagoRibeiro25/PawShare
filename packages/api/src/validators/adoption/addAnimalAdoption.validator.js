const { query, body } = require("express-validator");
const utils = require("../../utils");

/**
 * Returns an array of validation rules for the add review request.
 * @returns {Array} An array of validation rules.
 */

function validator() {
	return [
		query("animal_id")
			.exists()
			.withMessage("animal_id is required")
			.bail()
			.isInt()
			.withMessage("animal_id must be an integer")
			.bail()
			.isInt({ min: 1 })
			.withMessage("Invalid integer for animal_id"),
		body("email_contact")
			.exists()
			.withMessage("email_contact is required")
			.bail()
			.isEmail()
			.withMessage("Invalid email")
			.bail(),
		body("phone_contact")
			.exists()
			.withMessage("phone_contact is required")
			.bail()
			.matches(/^[0-9]{9}$/)
			.withMessage("Invalid phone number")
			.bail(),
		body("notes")
			.exists()
			.withMessage("notes is required")
			.bail()
			.isArray()
			.withMessage("notes must be an array")
			.bail()
			.isArray({ min: 1 })
			.withMessage("notes is empty")
			.bail()
			.isArray()
			.custom((value) => {
				// Checking if the array contains only strings
				return value.every((item) => typeof item === "string");
			})
			.withMessage("notes must be an array of strings")
			.bail()
			// Checking for empty strings in the array
			.custom((value) => {
				return value.every((item) => !item.match(/^\s*$/)); // Regex for checking empty strings or whitespaces
			})
			.withMessage("notes must not contain empty strings"),
		body("city")
			.exists()
			.withMessage("city is required")
			.bail()
			.isString()
			.withMessage("city must be a string")
			.bail()
			// Checking if the city exists
			.isIn(utils.cities.cities.map((city) => city.name))
			.withMessage("Invalid city"),
	];
}

module.exports = validator;
