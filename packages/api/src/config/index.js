const compression = require("./compression.config");
const rateLimit = require("./rateLimit.config");
const tokens = require("./jwt.config");

module.exports = {
	compression,
	rateLimit,
	tokens,
};
