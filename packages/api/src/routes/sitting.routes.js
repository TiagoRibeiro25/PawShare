const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get all sitting requests (feed)
router.get(
	"/",
	validators.sitting.getSittingsFeed(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.getSittingsFeed,
);

module.exports = router;
