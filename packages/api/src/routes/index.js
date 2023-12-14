const { Router } = require("express");
const userRoutes = require("./user.routes");
const adoptionRoutes = require("./adoption.routes");
const authRoutes = require("./auth.routes");
const cronjobRoutes = require("./cronjob.routes");
const storeRoutes = require("./store.routes");
const reviewRoutes = require("./review.routes");
const animalRoutes = require("./animal.routes");
const sittingRoutes = require("./sitting.routes");
const utils = require("../utils");
const swaggerUi = require("swagger-ui-express");
const config = require("../config");

const router = Router();

// Swagger Docs Route
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(config.docs, { explorer: true }));

// User Routes
router.use("/users", userRoutes);

// Adoption Routes
router.use("/adoption", adoptionRoutes);

// Sitting Routes
router.use("/sitting", sittingRoutes);

// Auth Routes
router.use("/auth", authRoutes);

// Store Routes
router.use("/store", storeRoutes);

// Cronjob Routes
router.use("/cronjob", cronjobRoutes);

// Review Routes
router.use("/reviews", reviewRoutes);

//Animal Routes
router.use("/animals", animalRoutes);

// Default Route
router.route("/").get((_req, res) => {
	utils.handleResponse(res, utils.http.StatusOK, "Hello World!");
});

module.exports = router;
