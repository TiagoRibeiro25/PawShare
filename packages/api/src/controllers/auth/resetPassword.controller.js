const utils = require("../../utils");
const db = require("../../db");

/**
 * Reset password controller
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function resetPassword(req, res) {
	try {
		const { token } = req.params;
		const { password } = req.body;

		// Check if there's a user with the given token
		const user = await db.mysql.User.findOne({
			where: {
				change_password_token: token,
			},
			attributes: ["id", "password"],
		});

		if (!user) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Invalid token");
			return;
		}

		// Check if the current password is the same as the new password
		const doPasswordsMatch = await utils.password.compare(password, user.password);
		if (doPasswordsMatch) {
			utils.handleResponse(
				res,
				utils.http.StatusBadRequest,
				"New password cannot be the same as the old password",
			);
			return;
		}

		// Hash the new password
		const hashedPassword = await utils.password.hash(password);

		// Update the user's password
		await user.update({
			password: hashedPassword,
			change_password_token: utils.tokens.generateRandomBase64Token(),
			change_password_generated_at: db.mysql.sequelize.literal("CURRENT_TIMESTAMP"),
		});

		utils.handleResponse(res, utils.http.StatusOK, "Password changed successfully");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = resetPassword;
