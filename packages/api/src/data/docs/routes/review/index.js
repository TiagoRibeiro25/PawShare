const fs = require("fs");
const YAML = require("yaml");

const postAddReview = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/review/post_add_review.yml", "utf8"),
);

module.exports = { postAddReview };
