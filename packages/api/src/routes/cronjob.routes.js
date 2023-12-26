const { Router } = require("express");
const middlewares = require("../middlewares");
const controllers = require("../controllers");

const router = Router();

// Delete all unverified users
router.delete(
	"/unverified-users",
	middlewares.validateCronjob,
	controllers.cronjob.deleteUnverifiedUsers,
);

router.delete(
	"/expired-sitting-requests",
	middlewares.validateCronjob,
	controllers.cronjob.deleteExpiredSittingRequests,
);

module.exports = router;
