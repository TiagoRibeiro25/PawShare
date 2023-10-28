const utils = require("../utils");
const db = require("../db");
const config = require("../config");

/**
 * Middleware function to validate auth and refresh tokens in the request headers.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @param {import("express").NextFunction} next - The Express NextFunction middleware.
 * @returns {Promise<void>}
 */
async function validateTokens(req, res, next) {
	try {
		// Get the tokens from the request headers
		const authToken = req.headers["x-auth-token"];
		const refreshToken = req.headers["x-refresh-token"];

		// Check if the tokens exist
		if (!authToken || !refreshToken) {
			utils.handleResponse(
				res,
				utils.http.StatusUnauthorized,
				"Missing auth token or refresh token",
			);
			return;
		}

		// Verify the tokens
		if (
			!utils.tokens.validateToken(authToken, "authToken") ||
			!utils.tokens.validateToken(refreshToken, "refreshToken")
		) {
			utils.handleResponse(
				res,
				utils.http.StatusUnauthorized,
				"Invalid auth token or refresh token",
			);
			return;
		}

		// Check if the refresh token has expired
		if (utils.tokens.didTokenExpire(refreshToken, "refreshToken")) {
			utils.handleResponse(
				res,
				utils.http.StatusUnauthorized,
				"Refresh token has expired",
			);
			return;
		}

		// Check if the refresh token is in the redis database (if it's not, it's been invalidated)
		const refreshTokenInRedis = await db.redis.refreshTokens.get(refreshToken);
		if (!refreshTokenInRedis) {
			utils.handleResponse(
				res,
				utils.http.StatusUnauthorized,
				"Refresh token has been invalidated",
			);
			return;
		}

		// Decode the tokens
		const decodedAuthToken = utils.tokens.decodeToken(authToken, "authToken");
		const decodedRefreshToken = utils.tokens.decodeToken(refreshToken, "refreshToken");

		// Check if the refresh token is about to expire (less than config.tokens.refreshGenerateIn seconds left)
		if (
			decodedRefreshToken.exp - Math.floor(Date.now() / 1000) <
			config.tokens.refreshGenerateIn
		) {
			// Generate a new refresh token
			const newRefreshToken = utils.tokens.generateToken(
				decodedAuthToken.userId,
				"refreshToken",
				decodedAuthToken.remember_me,
			);

			// Update the refresh token in the redis database
			await db.redis.refreshTokens.set(
				newRefreshToken,
				JSON.stringify({
					userId: decodedAuthToken.userId,
					remember_me: decodedAuthToken.remember_me,
				}),
			);

			// Set the expiration time of the refresh token
			await db.redis.refreshTokens.expire(
				refreshToken,
				decodedAuthToken.remember_me
					? config.tokens.refreshExpiresInRememberMe
					: config.tokens.refreshExpiresIn,
			);

			// Send the new refresh token in the response headers
			res.set("x-refresh-token", newRefreshToken);
		}

		// Check if the auth token expired
		if (utils.tokens.didTokenExpire(authToken, "authToken")) {
			// Generate a new auth token
			const newAuthToken = utils.tokens.generateToken(
				decodedAuthToken.userId,
				"authToken",
			);

			// Send the new auth token in the response headers
			res.set("x-auth-token", newAuthToken);
		}

		// Add the user id to the request object
		req.userId = decodedAuthToken.userId;

		next();
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = validateTokens;
