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

// Add animal to adoption list
router.post(
	"/",
	validators.adoption.addAnimalAdoption(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.addAnimalAdoption,
);

// Candidate to adopt an animal
router.post(
	"/:id/requested",
	validators.adoption.addCandidateAdoption(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.addCandidateAdoption,
);

// Get requested adoptions
router.get(
	"/requested",
	validators.adoption.getRequestedAdoptions(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.getRequestedAdoptions,
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
