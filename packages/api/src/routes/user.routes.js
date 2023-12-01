const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

// Verify User
router.patch(
	"/verify/:token",
	validators.users.verifyUser(),
	validators.validateResult,
	controllers.users.verifyUser,
);

// Get Logged User
router.get(
	"/:id",
	validators.users.getUser(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.users.getUser,
);

module.exports = router;
