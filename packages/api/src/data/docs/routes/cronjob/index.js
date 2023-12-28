const fs = require("fs");
const YAML = require("yaml");

const deleteUnverifiedUsers = YAML.parse(
	fs.readFileSync("./src/data/docs/routes/cronjob/delete_unverified_users.yml", "utf8"),
);

const deleteExpiredSittingRequests = YAML.parse(
	fs.readFileSync(
		"./src/data/docs/routes/cronjob/delete_expired_sitting_requests.yml",
		"utf8",
	),
);

module.exports = {
	deleteUnverifiedUsers,
	deleteExpiredSittingRequests,
};
