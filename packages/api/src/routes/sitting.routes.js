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

// Get requested sittings
router.get(
	"/requested",
	validators.sitting.getRequestedSittings(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.getRequestedSittings,
);

// Get detail of one sitting
router.get(
	"/:id",
	validators.sitting.getSittingDetail(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.getSittingDetail,
);

// Add animal to sitting list
router.post(
	"/",
	validators.sitting.addAnimalSitting(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.addAnimalSitting,
);

module.exports = router;
