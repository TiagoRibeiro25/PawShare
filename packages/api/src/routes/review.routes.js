const { Router } = require("express");
const middlewares = require("../middlewares");
const controllers = require("../controllers");
const validators = require("../validators");

const router = Router();

// Add a review
router.post(
	"/",
	validators.review.addReview(),
	validators.validateResult,
	middlewares.validateTokens,
	controllers.review.addReview,
);

module.exports = router;
