const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Get the details of an animal
router.get(
	"/:id",
	validators.animals.animalDetail(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.getAnimalDetail,
);

router.post(
	"/",
	validators.animals.animalPage(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.addAnimalPage,
);

router.patch(
	"/:id",
	validators.animals.updateAnimalPage(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.updateAnimalPage,
);

router.post(
	"/:id/document",
	validators.animals.addDocument(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.addDocument,
);

router.get(
	"/:animalId/document/:documentId",
	validators.animals.getDocument(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.getDocument,
);

router.delete(
	"/:animalId/document/:documentId",
	validators.animals.deleteDocument(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.deleteDocument,
);

router.get(
	"/:animalId/document",
	validators.animals.getDocuments(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.animals.getDocuments,
);

module.exports = router;
