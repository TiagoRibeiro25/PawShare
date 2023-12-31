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

// Delete all expired sitting requests
router.delete(
	"/expired-sitting-requests",
	middlewares.validateCronjob,
	controllers.cronjob.deleteExpiredSittingRequests,
);

// Refund all unpaid sittings that are older than 7 days
router.delete(
	"/refund-unpaid-sittings",
	middlewares.validateCronjob,
	controllers.cronjob.refundUnpaidSittings,
);

module.exports = router;
