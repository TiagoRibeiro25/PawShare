const compression = require("./compression.config");
const rateLimit = require("./rateLimit.config");
const tokens = require("./jwt.config");
const db = require("./db.config");
const docs = require("./docs.config");

module.exports = {
	compression,
	rateLimit,
	tokens,
	db,
	docs,
};
