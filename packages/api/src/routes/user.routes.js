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

// Update Logged User
router.patch(
	"/",
	validators.users.updateUser(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.users.updateUser,
);

// Buy / Redeem Coins
router.patch(
	"/coins",
	validators.users.handleCoins(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.users.handleCoins,
);

// Buy an item from the store
router.patch(
	"/buy/:itemId",
	validators.users.buyItem,
	validators.validateResult,
	middlewares.validateTokens,
	controllers.users.buyItem,
);

module.exports = router;
