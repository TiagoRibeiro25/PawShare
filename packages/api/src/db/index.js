const colors = require("colors");
const mysql = require("./mysql");
const redis = require("./redis");

/**
 * Connects to the mysql database and redis.
 * @async
 * @function connect
 * @returns {Promise<boolean>} Whether the connection was successful.
 */
async function connect() {
	try {
		await Promise.all([mysql.sequelize.authenticate(), redis.refreshTokens.connect()]);

		return true;
	} catch (error) {
		console.log(
			colors.red("Unable to connect to the database: ") +
				colors.yellow(error.message + "\n"),
		);

		return false;
	}
}

module.exports = { mysql, redis, connect };
