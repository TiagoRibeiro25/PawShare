/**
 * Generates an HTML email template for requesting a password reset.
 * @param {string} token - The reset password token to be included in the email.
 * @returns {string} - The HTML email template as a string.
 */
function requestResetPassword(token) {
	const link = `${process.env.FE_URL}/reset-password/${token}`;

	return `<h1>Reset your password</h1> <p>Please reset your password <a href="${link}">here</a>.</p> <p>If you didn't request a password reset, you can ignore this email.</p>`;
}

module.exports = requestResetPassword;
