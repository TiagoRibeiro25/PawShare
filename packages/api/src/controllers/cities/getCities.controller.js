const utils = require("../../utils");
const db = require("../../db");

/**
 * Get cities by search query.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getCities(req, res) {
	try {
		const { search } = req.query;

		const user = await db.mysql.User.findByPk(req.userId, {
			attributes: ["country"],
		});

		const cities = utils.cities
			.getCitiesFromCountry(user.country)
			.filter((city) => city.toLowerCase().includes(search.toLowerCase().trim()));

		if (!cities.length) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No cities found");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Cities retrieved successfully", {
			cities,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getCities;
