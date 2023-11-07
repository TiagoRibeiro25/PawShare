const { body } = require("express-validator");

/**
 * Returns an array of validation rules for the login route.
 * @returns {Array} An array of validation rules.
 */
function validator() {
	return [body("email").isEmail().withMessage("Email must be a valid email address")];
}

module.exports = validator;
