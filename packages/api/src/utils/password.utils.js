const bcrypt = require("bcryptjs");

/**
 * Hashes a password.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
async function hash(password) {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
}

/**
 * Compares a hashed password with a password.
 * @param {string} password - The password to compare.
 * @param {string} hashed - The hashed password.
 * @returns {Promise<boolean>} - The result of the comparison.
 */
async function compare(password, hashed) {
	const result = await bcrypt.compare(password, hashed);
	return result;
}

module.exports = { hash, compare };
