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

module.exports = router;
