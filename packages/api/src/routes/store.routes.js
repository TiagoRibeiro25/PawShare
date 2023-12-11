const { Router } = require("express");
const middlewares = require("../middlewares");
const controllers = require("../controllers");
const validators = require("../validators");

const router = Router();

// Buy / Redeem Coins
router.patch(
	"/coins",
	validators.store.handleCoins(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.store.handleCoins,
);

// Buy an item from the store
router.patch(
	"/buy/:itemId",
	validators.store.buyItem(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.store.buyItem,
);

module.exports = router;
