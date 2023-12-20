const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

router.get(
	"/:id",
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.getAnimalDetail,
);

router.post(
	"/",
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.addAnimalPage,
);

router.patch(
	"/:id",
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.updateAnimalPage,
);

router.post(
	"/:id/document",
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.addDocument,
);

router.get(
	"/:animalId/document/:documentId",
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.getDocument,
);

router.delete(
	"/:animalId/document/:documentId",
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.deleteDocument,
);

module.exports = router;
