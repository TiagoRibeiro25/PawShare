const compression = require("./compression.config");
const rateLimit = require("./rateLimit.config");
const tokens = require("./jwt.config");
const redis = require("./redis.config");

module.exports = {
	compression,
	rateLimit,
	tokens,
	redis,
};
