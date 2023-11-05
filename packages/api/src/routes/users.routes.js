const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const utils = require("../utils");

const router = Router();

// Login
router.post(
	"/login",
	validators.users.login(),
	validators.validateResult,
	controllers.users.login,
);

// Register
router.post(
	"/",
	validators.users.register(),
	validators.validateResult,
	controllers.users.register,
);

// Verify User
router.patch(
	"/verify/:token",
	validators.users.verifyUser(),
	validators.validateResult,
	controllers.users.verifyUser,
);

// Request Reset Password
router.post(
	"/request-reset-password",
	validators.users.requestResetPassword(),
	validators.validateResult,
	controllers.users.requestResetPassword,
);

// Reset Password
router.patch(
	"/reset-password/:token",
	validators.users.resetPassword(),
	validators.validateResult,
	controllers.users.resetPassword,
);

// Testing
router.get("/test", middlewares.validateTokens, (req, res) => {
	console.log(req.userId);
	utils.handleResponse(res, utils.http.StatusOK, "Test successful");
});

module.exports = router;
