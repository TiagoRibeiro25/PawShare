const { Router } = require("express");
const usersRoutes = require("./users.routes");
const cronjobRoutes = require("./cronjob.routes");
const utils = require("../utils");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../config/docs.config");

const router = Router();

// Swagger Docs Route
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerDocument, { explorer: true }));

// Users Routes
router.use("/users", usersRoutes);

// Cronjob Routes
router.use("/cronjob", cronjobRoutes);

// Default Route
router.route("/").get((_req, res) => {
	utils.handleResponse(res, utils.http.StatusOK, "Hello World!");
});

module.exports = router;
