const { body } = require("express-validator");

function validator() {
	return [
		body("name").isString({ min: 3 }).withMessage("Invalid document name"),
		body("image").isString().withMessage("Invalid document image"),
	];
}

module.exports = validator;
