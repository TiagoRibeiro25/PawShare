const utils = require("../../utils");
const db = require("../../db");
const services = require("../../services");
const templates = require("../../templates");
const countries = require("../../data/countries.json");

/**
 * @typedef LoginRequest
 * @property {string} email - The user's email
 * @property {string} password - The user's password
 * @property {boolean} remember_me - Whether to remember the user or not
 */

/**
 * Login controller.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function login(req, res) {
	try {
		/**  @type {LoginRequest} */
		const { email, password, remember_me } = req.body;

		// Check if there's a user with the same email
		const user = await db.mysql.User.findOne({ where: { email } });
		if (!user) {
			utils.handleResponse(
				res,
				utils.http.StatusNotFound,
				"There's no user with that email",
			);
			return;
		}

		const doPasswordsMatch = await utils.password.compare(password, user.password);
		if (!doPasswordsMatch) {
			utils.handleResponse(res, utils.http.StatusUnauthorized, "Wrong password");
			return;
		}

		if (!user.is_verified) {
			// Send the verification email again
			await services.sendEmail({
				from: "Paw Share Team",
				to: [{ Email: user.email, Name: user.display_name }],
				subject: "Welcome to Paw Share!",
				content: templates.confirmEmail(user.verify_user_token),
			});

			utils.handleResponse(
				res,
				utils.http.StatusUnauthorized,
				"An email has been sent to you to verify your account",
			);
			return;
		}

		// Generate the jwt auth token and the refresh token
		const authToken = utils.tokens.generateToken(user.id, "authToken");
		const refreshToken = utils.tokens.generateToken(user.id, "refreshToken", remember_me);

		utils.handleResponse(res, utils.http.StatusOK, "Login successful", {
			authToken,
			refreshToken,
			user: {
				id: user.id,
				coins: user.coins,
				country: countries.find((country) => country.code === user.country),
			},
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = login;
