const db = require("../../db");
const utils = require("../../utils");
const countries = require("../../data/countries.json");

const QUERY_ATTRIBUTES = {
	user: [
		"id",
		"display_name",
		"type",
		"country",
		"description",
		"badges",
		"selected_frame",
		"selected_banner",
		"createdAt",
		"updatedAt",
	],
	picture: ["provider_url"],
	animal: ["id", "name"],
};

/**
 * Returns the user data.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getUser(req, res) {
	try {
		const { id } = req.params;

		// Check if the user is trying to fetch his own data.
		const fetchLoggedUser = id === "me" || Number(id) === req.userId;

		/** @type {number} */
		const userId = fetchLoggedUser ? req.userId : Number(id);

		// Fetch the email only if the user is fetching is own profile
		const userAtributes = fetchLoggedUser
			? [...QUERY_ATTRIBUTES.user, "email", "coins"]
			: QUERY_ATTRIBUTES.user;

		const user = await db.mysql.User.findByPk(userId, {
			attributes: userAtributes,
			include: [
				{
					model: db.mysql.Picture,
					attributes: QUERY_ATTRIBUTES.picture,
				},
				{
					model: db.mysql.Animal,
					attributes: QUERY_ATTRIBUTES.animal,
					include: [{ model: db.mysql.Picture, attributes: QUERY_ATTRIBUTES.picture }],
				},
			],
		});

		if (!user) {
			utils.handleResponse(res, utils.http.StatusNotFound, "User not found");
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

module.exports = getUser;
