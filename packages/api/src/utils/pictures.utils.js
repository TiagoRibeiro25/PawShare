/**
 * Get the user picture URL.
 * @param {string} name - The user name.
 * @returns {string} The user picture URL.
 */
function getUserPictureUrl(name) {
	const baseUrl = "https://api.dicebear.com/7.x/adventurer-neutral";
	return `${baseUrl}/svg?seed=${encodeURIComponent(name)}`;
}

module.exports = { getUserPictureUrl };
