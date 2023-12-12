const { query } = require("express-validator");
const animalTypes = require("../../data/animals.json");
const colors = require("../../data/colors.json");
const utils = require("../../utils");

/**
 * Returns an array of validation rules for the get adoption detail endpoint.
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
			.isInt({ min: 1 })
			.toInt()
			.withMessage("Limit must be a positive integer"),

		query("city")
			.optional()
			.isString()
			.isIn(utils.cities.cities.map((city) => city.name))
			.withMessage("Invalid city"),

		query("type")
			.optional()
			.isString()
			.isIn(animalTypes)
			.withMessage("Invalid animal type"),

		query("size")
			.optional()
			.isString()
			.isIn(["Small", "Medium", "Large"])
			.withMessage("Invalid animal size"),

		query("gender")
			.optional()
			.isString()
			.isIn(["Male", "Female", "Other"])
			.withMessage("Invalid gender"),

		query("color").optional().isString().isIn(colors).withMessage("Invalid color"),
	];
}

module.exports = validator;
