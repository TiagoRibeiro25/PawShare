const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef AddanimalADoptionBody
 * @property {string} email_contact - The email contact
 * @property {string} phone_contact - The phone contact
 * @property {Array} notes - The notes
 * @property {string} city - The city
 */

/**
 * Add animal to adoption
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function addAnimalAdoption(req, res) {
	try {
		/** @type {number} */
		const loggedUserId = req.userId;

		/** @type {number} */
		const animal_id = parseInt(req.query.animal_id);

		/** @type {AddanimalADoptionBody} */
		const { email_contact, phone_contact, notes, city } = req.body;

		const checkAnimal = await db.mysql.Animal.findOne({
			where: {
				id: animal_id,
			},
		});

		// Checking if the animal exists
		if (!checkAnimal) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Animal not found");
		}
		// Checking if the logged user is not the owner of the animal
		if (checkAnimal.owner_id !== loggedUserId) {
			return utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You are not the owner of the animal",
			);
		}

		const checkAdoption = await db.mysql.Adoption.findOne({
			where: {
				animal_id: animal_id,
				is_closed: false,
			},
		});

		// Checking if the animal is already in adoption
		if (checkAdoption) {
			return utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"Animal already in adoption",
			);
		}

		const checkSitting = await db.mysql.Sitting.findOne({
			where: {
				animal_id: animal_id,
				is_closed: false,
			},
		});

		// Checking if the animal is in another service (sitting)
		if (checkSitting) {
			return utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"Animal already in sitting",
			);
		}

		const loggedUser = await db.mysql.User.findByPk(loggedUserId);
		const citiesFromUserCountry = utils.cities.getCitiesFromCountry(loggedUser.country);

		//  Checking if the city is from the logged user country
		if (!citiesFromUserCountry.includes(city)) {
			return utils.handleResponse(
				res,
				utils.http.StatusBadRequest,
				"This city is not from your country",
			);
		}

		const newAdoption = await db.mysql.Adoption.create({
			animal_id: animal_id,
			owner_id: loggedUserId,
			email_contact: email_contact,
			phone_contact: phone_contact,
			notes: JSON.stringify(notes),
			city: city,
		});

		return utils.handleResponse(
			res,
			utils.http.StatusCreated,
			"Adoption added successfully",
			{
				adoption: {
					id: newAdoption.id,
					animal_id: newAdoption.animal_id,
					owner_id: newAdoption.owner_id,
					email_contact: newAdoption.email_contact,
					phone_contact: newAdoption.phone_contact,
					notes: JSON.parse(newAdoption.notes),
					city: newAdoption.city,
					created_at: newAdoption.createdAt,
					updated_at: newAdoption.updatedAt,
				},
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = addAnimalAdoption;
