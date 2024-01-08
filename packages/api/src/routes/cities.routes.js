const { Router } = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const validators = require("../validators");

const router = Router();

// Get cities
router.get(
	"/",
	validators.cities.getCities(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.cities.getCities,
);

module.exports = router;
