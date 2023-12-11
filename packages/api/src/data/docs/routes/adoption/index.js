const fs = require("fs");
const YAML = require("yaml");

const getAdoptionDetail = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/adoption/get_adoption_detail.yml", "utf8"),
);

module.exports = {
	getAdoptionDetail,
};
