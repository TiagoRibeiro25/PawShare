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

// Get created sittings
router.get(
	"/created",
	validators.sitting.getCreatedSittings(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.getCreatedSittings,
);

// Get candidates of one sitting
router.get(
	"/:id/users",
	validators.sitting.getCandidates(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.getCandidates,
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

// Delete one sitting
router.delete(
	"/:id",
	validators.sitting.deleteAnimalSitting(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.deleteAnimalSitting,
);

router.post(
	"/requested/:id",
	validators.sitting.addCandidate(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.addCandidate,
);

router.delete(
	"/requested/:id",
	validators.sitting.deleteCandidate(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.deleteCandidate,
);

router.patch(
	"/:sittingId/users/:candidateId",
	validators.sitting.acceptSittingCandidate(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.acceptSittingCandidate,
);

router.patch(
	"/:sittingId/pay",
	validators.sitting.completePayment(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.sitting.sittingPayment,
);

module.exports = router;
