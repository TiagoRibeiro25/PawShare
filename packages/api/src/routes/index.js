const { Router } = require("express");
const usersRoutes = require("./users.routes");
const utils = require("../utils");

const router = Router();

router.use("/users", usersRoutes);

router.route("/").get((_req, res) => {
	utils.handleResponse(res, utils.http.StatusOK, "Hello World!");
});

module.exports = router;
