const { Router } = require("express");
const usersRoutes = require("./users.routes");
const cronjobRoutes = require("./cronjob.routes");
const utils = require("../utils");

const router = Router();

router.use("/users", usersRoutes);
router.use("/cronjob", cronjobRoutes);

router.route("/").get((_req, res) => {
	utils.handleResponse(res, utils.http.StatusOK, "Hello World!");
});

module.exports = router;
