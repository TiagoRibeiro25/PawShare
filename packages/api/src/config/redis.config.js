// Configure connection options with a timeout
const connectionOptions = {
	retryStrategy: (times) => {
		// Retry for a maximum of 5 times
		if (times >= 5) {
			// Throw an error after the maximum retries
			throw new Error("Failed to connect to Redis after multiple attempts");
		}
		// Retry after 1 second
		return 1000;
	},
	lazyConnect: true, // Prevent automatic connection
};

module.exports = { connectionOptions };
