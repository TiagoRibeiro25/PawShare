const { param } = require("express-validator");

/**
 * Returns an array of validation rules for the get animal detail request.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [param("id").isInt({ min: 1 }).withMessage("Invalid animal id")];
}

module.exports = validator;
