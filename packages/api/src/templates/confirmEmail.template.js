/**
 * Generates an HTML email template for confirming a user's email address.
 * @param {string} token - The verification token to be included in the email.
 * @returns {string} - The HTML email template as a string.
 */
function confirmEmail(token) {
	const link = `${process.env.FE_URL}/${token}`;
	return `<h1>Welcome to Paw Share!</h1> <p>Please verify your account <a href="${link}">here</a>.</p>`;
}

module.exports = confirmEmail;
