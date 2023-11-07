const db = require("../../db");
const utils = require("../../utils");
const countries = require("../../data/countries.json");

const QUERY_ATTRIBUTES = {
	user: [
		"id",
		"display_name",
		"email",
		"type",
		"country",
		"description",
		"coins",
		"badges",
		"selected_frame",
		"selected_banner",
		"createdAt",
		"updatedAt",
	],
	picture: ["provider_url"],
};

/**
 * Returns the logged user data.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getLoggedUser(req, res) {
	try {
		const user = await db.mysql.User.findByPk(req.userId, {
			attributes: QUERY_ATTRIBUTES.user,
			include: [{ model: db.mysql.Picture, attributes: QUERY_ATTRIBUTES.picture }],
		});

		// This should never happen, unless the user is deleted from the database and the token is not revoked yet.
		if (!user) {
			utils.handleResponse(res, utils.http.NOT_FOUND, "User not found");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "User data retrieved successfully", {
			...user.toJSON(),
			badges: JSON.parse(user.badges),
			country: countries.find((country) => country.code === user.country),
			picture:
				user.picture?.provider_url || utils.pictures.getUserPictureUrl(user.display_name),
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getLoggedUser;
