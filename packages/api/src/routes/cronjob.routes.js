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

// TODO (tiago): Add cronjob to delete all sitting requests that have expired (not accepted by the owner before the date of the sitting)

module.exports = router;
