const fs = require("fs");
const YAML = require("yaml");

const getCities = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/cities/get_cities.yml", "utf8"),
);

module.exports = {
	getCities,
};
