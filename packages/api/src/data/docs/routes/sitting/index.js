const fs = require("fs");
const YAML = require("yaml");

const getSittingFeed = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/sitting/get_sitting_feed.yml", "utf8"),
);

const getSittingDetail = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/sitting/get_sitting_detail.yml", "utf8"),
);

const postAnimalSitting = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/sitting/post_animal_sitting.yml", "utf8"),
);

const getRequestedSittings = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/sitting/get_requested_sittings.yml", "utf8"),
);

module.exports = {
	getSittingFeed,
	getSittingDetail,
	postAnimalSitting,
	getRequestedSittings,
};
