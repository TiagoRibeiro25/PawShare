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
module.exports = router;
