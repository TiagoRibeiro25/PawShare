const { param } = require("express-validator");

function validator() {
	return [
		param("sittingId").isInt({ min: 1 }).withMessage("Invalid sitting id"),
		param("candidateId").isInt({ min: 1 }).withMessage("Invalid candidate id"),
	];
}

module.exports = validator;
