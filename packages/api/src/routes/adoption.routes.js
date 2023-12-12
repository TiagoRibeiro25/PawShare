const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get all adoptions (feed)
router.get(
	"/",
	validators.adoption.getAdoptionsFeed(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.getAdoptionsFeed,
);

// Get detail of one adoption
router.get(
	"/:id",
	validators.adoption.getAdoptionDetail(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.getAdoptionDetail,
);

module.exports = router;
