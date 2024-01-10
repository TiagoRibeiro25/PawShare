const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef AddAnimalPageBody
 * @property {string} name - The name (required)
 * @property {string} type - The type (required)
 * @property {string} gender - The gender (required)
 * @property {string} color - The color (required)
 * @property {string} size - The size (required)
 * @property {string} description - The description (required)
 */

/**
 * Add animal page
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function addAnimalPage(req, res) {
	try {
		/** @type {number} */
		const loggedUserId = req.userId;

		/** @type {AddAnimalPageBody} */
		const { name, type, gender, color, size, description } = req.body;

		if (!loggedUserId) {
			console.log(loggedUserId);
			return utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You are not logged in",
			);
		}

		//create the animal page in the database

		const animalPage = await db.mysql.Animal.create({
			owner_id: loggedUserId,
			name: name,
			type: type,
			gender: gender,
			color: color,
			size: size,
			description: description,
		});

		return utils.handleResponse(res, utils.http.StatusCreated, "Animal page created", {
			animal: {
				id: animalPage.id,
				animal_id: animalPage.animal_id,
				owner_id: loggedUserId,
				name: animalPage.name,
				type: animalPage.type,
				gender: addAnimalPage.gender,
				color: animalPage.color,
				size: animalPage.size,
				description: animalPage.description,
			},
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = addAnimalPage;
