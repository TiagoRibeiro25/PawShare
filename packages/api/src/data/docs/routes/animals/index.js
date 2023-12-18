const fs = require("fs");
const YAML = require("yaml");

const getAnimalDetail = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/animals/get_animal_detail.yml", "utf8"),
);

module.exports = {
	getAnimalDetail,
};
