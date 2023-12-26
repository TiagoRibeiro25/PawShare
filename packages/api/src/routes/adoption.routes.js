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

// Get requested adoptions
router.get(
	"/requested",
	validators.adoption.getRequestedAdoptions(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.getRequestedAdoptions,
);

// Get adoptions created
router.get(
	"/created",
	validators.adoption.getCreatedAdoptions(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.getCreatedAdoptions,
);

// Get detail of one adoption
router.get(
	"/:id",
	validators.adoption.getAdoptionDetail(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.getAdoptionDetail,
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

// Get candidates for an adoption
router.get(
	"/:id/users",
	validators.adoption.getCandidates(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.getCandidates,
);

// TODO (tiago): PATCH /adoption/{id}/users/{id} -> Accept a user to adopt an animal

// Delete one adoption
router.delete(
	"/:id",
	validators.adoption.deleteAnimalAdoption(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.deleteAnimalAdoption,
);

// Delete one requested adoption
router.delete(
	"/:id/requested",
	validators.adoption.deleteRequestAdoption(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.adoption.deleteRequestAdoption,
);

module.exports = router;
