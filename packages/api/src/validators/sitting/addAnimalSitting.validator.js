const { query, body } = require("express-validator");
const utils = require("../../utils");
const moment = require("moment"); //library to handle dates validations

/**
 * Returns an array of validation rules for the add animal sitting request.
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
			.optional()
			.isArray({ min: 1 })
			.withMessage("notes must be an array and containing at least one item")
			.bail()
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
		body("coins")
			.exists()
			.withMessage("coins is required")
			.bail()
			.isInt({ min: 1 })
			.withMessage("Invalid coins"),
		body("start_date")
			.exists()
			.withMessage("start_date is required")
			.bail()
			.isDate()
			.withMessage("Invalid start_date")
			.bail()
			.custom((value) => {
				// Checking if the start_date is at least tomorrow and not in the past
				return moment(value, "YYYY/MM/DD").isSameOrAfter(moment().add(1, "days"), "day");
			})
			.withMessage("start_date must be at least tomorrow")
			.bail()
			.custom((value, { req }) => {
				// Checking if the interval between start_date and end_date is at least 24 hours
				return moment(value, "YYYY/MM/DD")
					.add(1, "days")
					.isSameOrBefore(moment(req.body.end_date, "YYYY/MM/DD"), "day");
			})
			.withMessage(
				"The interval between start_date and end_date must be at least 24 hours",
			),

		body("end_date")
			.exists()
			.withMessage("end_date is required")
			.bail()
			.isDate()
			.withMessage("Invalid end_date"),
	];
}

module.exports = validator;
