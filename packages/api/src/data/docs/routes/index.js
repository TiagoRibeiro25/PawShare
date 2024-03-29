const fs = require("fs");
const YAML = require("yaml");
const auth = require("./auth");
const cronjob = require("./cronjob");
const users = require("./users");
const animals = require("./animals");
const store = require("./store");
const review = require("./review");
const adoption = require("./adoption");
const sitting = require("./sitting");
const cities = require("./cities");

const getHelloWorld = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/default/get_hello_world.yml", "utf8"),
);
const notFound = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/default/not_found.yml", "utf8"),
);

module.exports = {
	auth,
	cronjob,
	default: { getHelloWorld, notFound },
	users,
	animals,
	store,
	review,
	adoption,
	sitting,
	cities,
};
