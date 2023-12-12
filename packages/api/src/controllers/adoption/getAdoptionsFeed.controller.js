const utils = require("../../utils");
const db = require("../../db");

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;

/**
 * @typedef Options
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property {string?} city - The city name.
 * @property {string?} type - The animal type.
 * @property {"Small" | "Medium" | "Large" | undefined} size - The animal size.
 * @property {"Male" | "Female" | "Other" | undefined} gender - The animal gender.
 * @property {string?} color - The animal color.
 */

/**
 * @typedef GetQueryOptions
 * @property {string?} city - The city name.
 * @property {string?} type - The animal type.
 * @property {"Small" | "Medium" | "Large" | undefined} size - The animal size.
 * @property {"Male" | "Female" | "Other" | undefined} gender - The animal gender.
 * @property {string?} color - The animal color.
 */

/**
 * @param {GetQueryOptions} options
 * @param {string} userCountry
 * @returns {import("sequelize").WhereOptions}
 */
function getQuery(options, userCountry) {
	const query = {};

	for (const [key, value] of Object.entries(options)) {
		if (value) {
			// Check if the key is related to the animal table and use the correct prefix.
			const isAnimalKey = ["type", "size", "gender", "color"].includes(key);
			const prefix = isAnimalKey ? "animal." : "";
			query[`${prefix}${key}`] = value;
		}
	}

	// If the city is not specified, return all adoptions from the user's country.
	if (!options.city) {
		query["$user.country$"] = userCountry;
	}

	return query;
}

/**
 * Get the adoptions (feed).
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getAdoptionsFeed(req, res) {
	try {
		/** @type {Options} */
		const {
			page = DEFAULT_PAGE,
			limit = DEFAULT_LIMIT,
			city,
			type,
			size,
			gender,
			color,
		} = req.query;

		const loggedUser = await db.mysql.User.findByPk(req.userId);
		const citiesFromUserCountry = utils.cities.getCitiesFromCountry(loggedUser.country);

		// Check if the city exists in the user's country
		if (city && !citiesFromUserCountry.includes(city)) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You can't see adoptions from other countries",
			);
			return;
		}

		const adoptions = await db.mysql.Adoption.findAndCountAll({
			where: {
				...getQuery({ city, type, size, gender, color }, loggedUser.country),
				"$user.country$": loggedUser.country,
			},
			limit: limit,
			offset: (page - 1) * limit,
			order: [["createdAt", "DESC"]],
			include: [
				{
					model: db.mysql.Animal,
					as: "animal",
					attributes: ["id", "name", "gender", "description"],
					include: [
						{
							model: db.mysql.Picture,
							as: "picture",
							attributes: ["id", "provider_url"],
						},
					],
				},
				{
					model: db.mysql.User,
					as: "user",
					attributes: ["country"],
				},
			],
		});

		const totalAdoptions = adoptions.count;
		const resultAdoptions = adoptions.rows;

		// Check if there are any adoptions for the given params
		if (!resultAdoptions || resultAdoptions.length === 0) {
			utils.handleResponse(
				res,
				utils.http.StatusNotFound,
				"No adoptions found",
				resultAdoptions,
			);
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Adoptions retrieved successfully", {
			adoptions: resultAdoptions.map((adoption) => {
				const parsedAdoption = adoption.toJSON();

				return {
					id: parsedAdoption.id,
					city: parsedAdoption.city,
					animal: {
						...parsedAdoption.animal,
						picture: parsedAdoption.animal.picture?.provider_url,
					},
					updated_at: parsedAdoption.updatedAt,
					created_at: parsedAdoption.createdAt,
				};
			}),
			total: totalAdoptions,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getAdoptionsFeed;
