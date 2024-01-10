const utils = require("../../utils");
const config = require("../../config");
const db = require("../../db");
const { Op } = require("sequelize");

/**
 * @typedef Options
 * @property {number?} page - The page number.
 * @property {number?} limit - The number of items per page.
 * @property {string?} city - The city name.
 * @property {string?} type - The animal type.
 * @property {"Small" | "Medium" | "Large" | undefined} size - The animal size.
 * @property {"Male" | "Female" | "Other" | undefined} gender - The animal gender.
 * @property {string?} color - The animal color.
 * @property {number?} coins - The coins.
 */

/**
 * @typedef GetQueryOptions
 * @property {string?} city - The city name.
 * @property {string?} type - The animal type.
 * @property {"Small" | "Medium" | "Large" | undefined} size - The animal size.
 * @property {"Male" | "Female" | "Other" | undefined} gender - The animal gender.
 * @property {string?} color - The animal color.
 * @property {number?} coins - The minimum amount of coins.
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
			// Check if the key is related to the coins and use the correct prefix.
			if (key === "coins") {
				query["coins"] = { [Op.gte]: value };
				continue;
			}

			// Check if the key is related to the animal table and use the correct prefix.
			const isAnimalKey = ["type", "size", "gender", "color"].includes(key);
			const prefix = isAnimalKey ? "animal." : "";
			query[`$${prefix}${key}$`] = value;
		}
	}

	// Only show sittings from the user's country
	query["$user.country$"] = userCountry;

	// Only show sittings that start in the future
	query.start_date = { [Op.gte]: new Date() };

	query.is_closed = false;

	return query;
}

/**
 * Get the sitting requests (feed).
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getSittingsFeed(req, res) {
	try {
		/** @type {Options} */
		const {
			page = config.pagination.adoptions.feed.defaultPage,
			limit = config.pagination.adoptions.feed.defaultLimit,
			city,
			type,
			size,
			gender,
			color,
			coins,
		} = req.query;

		const loggedUser = await db.mysql.User.findByPk(req.userId);

		// Check if the city exists in the user's country
		if (city && !utils.cities.getCitiesFromCountry(loggedUser.country).includes(city)) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You can't see sitting requests from other countries",
			);
			return;
		}

		const sittings = await db.mysql.Sitting.findAndCountAll({
			where: {
				...getQuery({ city, type, size, gender, color, coins }, loggedUser.country),
			},
			limit: limit,
			offset: (page - 1) * limit,
			order: [["createdAt", "DESC"]],
			attributes: [
				"id",
				"city",
				"coins",
				"start_date",
				"end_date",
				"updatedAt",
				"createdAt",
			],
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

		const resultSitting = sittings.rows;

		if (!resultSitting || resultSitting.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No sitting requests found");
			return;
		}

		utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Sitting requests retrieved successfully",
			{
				sittings: resultSitting.map((sitting) => {
					const parsedSitting = sitting.toJSON();

					return {
						id: parsedSitting.id,
						city: parsedSitting.city,
						coins: parsedSitting.coins,
						start_date: parsedSitting.start_date,
						end_date: parsedSitting.end_date,
						animal: {
							...parsedSitting.animal,
							picture: parsedSitting.animal.picture?.provider_url || null,
						},
						updated_at: parsedSitting.updatedAt,
						created_at: parsedSitting.createdAt,
					};
				}),
				total: sittings.count,
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getSittingsFeed;
