const db = require("../../db");
const utils = require("../../utils");
const services = require("../../services");
const templates = require("../../templates");

/**
 * @typedef RegisterRequest
 * @property {string} display_name - The user's display name
 * @property {string} email - The user's email
 * @property {string} password - The user's password
 * @property {string} type - The user's type
 * @property {string} country - The user's country
 */

/**
 * Registers a new user.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function register(req, res) {
	try {
		/**  @type {RegisterRequest} */
		const { display_name, email, password, type, country } = req.body;

		// Check if there's already a user with the same email
		const user = await db.mysql.User.findOne({
			where: { email },
		});

		if (user) {
			utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"There's already a user with the same email",
			);
			return;
		}

		const hashedPassword = await utils.password.hash(password);

		const newUser = await db.mysql.User.create({
			display_name,
			email,
			password: hashedPassword,
			type,
			country,
			change_password_token: utils.tokens.generateRandomBase64Token(),
			verify_user_token: utils.tokens.generateRandomBase64Token(),
		});

		// Send the confirmation email
		await services.sendEmail({
			from: "Paw Share Team",
			to: [{ Email: newUser.email, Name: newUser.display_name }],
			subject: "Welcome to Paw Share!",
			content: templates.confirmEmail(newUser.verify_user_token),
		});

		utils.handleResponse(
			res,
			utils.http.StatusCreated,
			"A confirmation email has been sent",
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = register;
