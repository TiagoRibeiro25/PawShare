const fs = require("fs");
const YAML = require("yaml");

const postLogin = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/auth/post_login.yml", "utf8"),
);

const postRegister = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/auth/post_register.yml", "utf8"),
);

const postRequestResetPassword = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/auth/post_request_reset_password.yml", "utf8"),
);

const patchResetPassword = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/auth/patch_reset_password.yml", "utf8"),
);

module.exports = {
	postLogin,
	postRegister,
	postRequestResetPassword,
	patchResetPassword,
};
