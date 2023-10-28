const Redis = require("ioredis");
const config = require("../config");

// Connect to Redis with the specified options
/** @type {Redis.Redis} */
const refreshTokens = new Redis({
	host: process.env.REDIS_HOST,
	port: parseInt(process.env.REDIS_PORT),
	db: parseInt(process.env.REDIS_DB),
	username: process.env.REDIS_USERNAME || undefined, // Optional if running locally
	password: process.env.REDIS_PASSWORD || undefined, // Optional if running locally
	keyPrefix: "refreshTokens:",
	...config.redis.connectionOptions,
});

module.exports = {
	refreshTokens,
};
