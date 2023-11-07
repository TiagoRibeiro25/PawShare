const db = require("../../db");
const utils = require("../../utils");
const services = require("../../services");
const templates = require("../../templates");

/**
 * Request a password reset (send an email with a link to reset the password).
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function requestResetPassword(req, res) {
	try {
		// Get the email from the request body
		const { email } = req.body;

		// Check if there's an user with that email
		const user = await db.mysql.User.findOne({
			where: { email },
		});

		if (!user) {
			utils.handleResponse(res, utils.http.StatusNotFound, "User not found");
			return;
		}

		// Check if the user tried to reset the password in the last 24 hours
		if (user.change_password_generated_at > new Date(Date.now() - 24 * 60 * 60 * 1000)) {
			utils.handleResponse(
				res,
				utils.http.StatusTooManyRequests,
				"You can only request a password reset once every 24 hours",
			);
			return;
		}

		// Generate a new token and save it in the database
		const resetPasswordToken = utils.tokens.generateRandomBase64Token();
		await user.update({
			change_password_token: resetPasswordToken,
			change_password_generated_at: db.mysql.sequelize.literal("CURRENT_TIMESTAMP"),
		});

		// Send the email with the link to reset the password
		await services.sendEmail({
			from: "Paw Share Team",
			to: [{ Email: user.email, Name: user.display_name }],
			subject: "Paw Share - Reset your password",
			content: templates.requestResetPassword(resetPasswordToken),
		});

		utils.handleResponse(res, utils.http.StatusOK, "Email sent successfully");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = requestResetPassword;
