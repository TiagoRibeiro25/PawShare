const { param } = require("express-validator");

/**
 * Returns an array of validation rules for the candidate to adopt an animal endpoint
 * @returns {Array} An array of validation rules
 */

function validator() {
	return [param("id").isInt({ min: 1 }).withMessage("Invalid adoption id")];
}

module.exports = validator;
