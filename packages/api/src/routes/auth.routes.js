const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const utils = require("../utils");

const router = Router();

// Login
router.post(
	"/login",
	validators.auth.login(),
	validators.validateResult,
	controllers.auth.login,
);

// Register
router.post(
	"/register",
	validators.auth.register(),
	validators.validateResult,
	controllers.auth.register,
);

// Request Reset Password
router.post(
	"/request-reset-password",
	validators.auth.requestResetPassword(),
	validators.validateResult,
	controllers.auth.requestResetPassword,
);

// Reset Password
router.patch(
	"/reset-password/:token",
	validators.auth.resetPassword(),
	validators.validateResult,
	controllers.auth.resetPassword,
);

// Testing
router.get("/test", middlewares.validateTokens, (req, res) => {
	console.log(req.userId);
	utils.handleResponse(res, utils.http.StatusOK, "Test successful");
});

module.exports = router;
