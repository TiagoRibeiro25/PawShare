/**
 * Get the user picture URL.
 * @param {string} name - The user name.
 * @returns {string} The user picture URL.
 */
function getUserPictureUrl(name) {
	const baseUrl = "https://ui-avatars.com/api/?background=414587&color=F8B436";
	return `${baseUrl}&name=${encodeURIComponent(name)}`;
}

module.exports = { getUserPictureUrl };
