//TODO: Find a way for all pictures to have an happy face (option['mood'][]=happy didn't work)
/**
 * Get the user picture URL.
 * @param {string} name - The user name.
 * @returns {string} The user picture URL.
 */
function getUserPictureUrl(name) {
	const baseUrl = "https://api.dicebear.com/7.x/micah";
	return `${baseUrl}/svg?seed=${encodeURIComponent(name)}`;
}

module.exports = {
	getUserPictureUrl,
};
