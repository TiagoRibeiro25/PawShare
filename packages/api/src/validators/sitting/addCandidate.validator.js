const { param } = require("express-validator");

function validator() {
	return [param("id").isInt({ min: 1 }).withMessage("Invalid sitting id")];
}

module.exports = validator;
