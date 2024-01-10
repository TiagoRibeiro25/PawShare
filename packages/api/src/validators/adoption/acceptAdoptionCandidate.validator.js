const { param } = require("express-validator");

/**
 * Returns an array of validation rules for the accept adoption candidate endpoint
 * @returns {Array} An array of validation rules
 */
function validator() {
	return [
		param("adoptionId").isInt({ min: 1 }).withMessage("Invalid adoption id"),
		param("candidateId").isInt({ min: 1 }).withMessage("Invalid candidate id"),
	];
}

module.exports = validator;
