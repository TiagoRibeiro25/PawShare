const fs = require("fs");
const YAML = require("yaml");

const patchVerifyUser = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/users/patch_verify_user.yml", "utf8"),
);

const getLoggedUser = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/users/get_logged_user.yml", "utf8"),
);

module.exports = {
	patchVerifyUser,
	getLoggedUser,
};
