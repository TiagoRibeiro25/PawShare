const { param } = require("express-validator");

function validator() {
	return [param("animalId").isInt({ min: 1 }).withMessage("Invalid animal id")];
}

module.exports = validator;
