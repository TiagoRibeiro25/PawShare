const fs = require("fs");
const YAML = require("yaml");

const info = YAML.parse(fs.readFileSync("./src/data/docs/info.yml", "utf8"));

// Default Routes
const getHelloWorld = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/default/get_hello_world.yml", "utf8"),
);
const notFound = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/default/not_found.yml", "utf8"),
);

// Cronjob Routes
const deleteUnverifiedUsers = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/cronjob/delete_unverified_users.yml", "utf8"),
);

// User Routes
const postLogin = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/users/post_login.yml", "utf8"),
);

const postRegister = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/users/post_register.yml", "utf8"),
);

const patchVerifyUser = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/users/patch_verify_user.yml", "utf8"),
);

const postRequestResetPassword = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/users/post_request_reset_password.yml", "utf8"),
);

const patchResetPassword = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/users/patch_reset_password.yml", "utf8"),
);

/** @type {import("swagger-jsdoc").SwaggerDefinition} */
const swaggerDefinition = {
	openapi: "3.0.1",
	info,
	servers: [{ url: "http://localhost:5000/api/v1" }],
	paths: {
		"/": { get: getHelloWorld },
		"/{any*}": { get: notFound },
		"/cronjob/unverified-users": { delete: deleteUnverifiedUsers },
		"/users/login": { post: postLogin },
		"/users": { post: postRegister },
		"/users/verify/{token}": { patch: patchVerifyUser },
		"/users/request-reset-password": { post: postRequestResetPassword },
		"/users/reset-password/{token}": { patch: patchResetPassword },
	},
};

module.exports = swaggerDefinition;
