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

// Auth Routes
const postLogin = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/auth/post_login.yml", "utf8"),
);

const postRegister = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/auth/post_register.yml", "utf8"),
);

const patchVerifyUser = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/users/patch_verify_user.yml", "utf8"),
);

const postRequestResetPassword = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/auth/post_request_reset_password.yml", "utf8"),
);

const patchResetPassword = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/auth/patch_reset_password.yml", "utf8"),
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
		"/auth/login": { post: postLogin },
		"/auth/register": { post: postRegister },
		"/auth/request-reset-password": { post: postRequestResetPassword },
		"/auth/reset-password/{token}": { patch: patchResetPassword },
		"/users/verify/{token}": { patch: patchVerifyUser },
	},
};

module.exports = swaggerDefinition;
