const { param } = require("express-validator");

/**
 * Returns an array of validation rules for the get adoption detail endpoint.
 * @returns {Array} An array of validation rules
 */

function validator() {
	return [
		param("id").isInt().withMessage("Invalid adoption id"),
		param("id").custom((value) => {
			if (value <= 0) {
				throw new Error("Invalid integer for adoption id");
			}
			return true;
		}),
	];
}

module.exports = validator;
