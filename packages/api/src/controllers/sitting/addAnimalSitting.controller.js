const db = require("../../db");
const utils = require("../../utils");

/**
 * @typedef AddanimalSittingBody
 * @property {string} email_contact - The email contact
 * @property {string} phone_contact - The phone contact
 * @property {Array} notes - The notes
 * @property {string} city - The city
 * @property {number} coins - The Paw coins
 * @property {string} start_date - The start date
 * @property {string} end_date - The end date
 */

/**
 * Add animal to sitting
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function addAnimalSitting(req, res) {
	try {
		/** @type {number} */
		const loggedUserId = req.userId;

		/** @type {number} */
		const animal_id = parseInt(req.query.animal_id);

		/** @type {AddanimalSittingBody} */
		const { email_contact, phone_contact, notes, city, coins, start_date, end_date } =
			req.body;

		const checkAnimal = await db.mysql.Animal.findOne({
			where: {
				id: animal_id,
			},
			include: [
				{
					model: db.mysql.Sitting,
					where: {
						is_closed: false,
					},
					required: false, // Left join
				},
				{
					model: db.mysql.Adoption,
					where: {
						is_closed: false,
					},
					required: false,
				},
			],
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

		// Checking if the animal is already in sitting list
		if (checkAnimal.sittings.length > 0) {
			return utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"Animal already in sitting",
			);
		}

		// Checking if the animal is in another service (adoption list)
		if (checkAnimal.adoptions.length > 0) {
			return utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"Animal already in adoption",
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

		const newSitting = await db.mysql.Sitting.create({
			animal_id: animal_id,
			owner_id: loggedUserId,
			email_contact: email_contact,
			phone_contact: phone_contact,
			start_date: start_date,
			end_date: end_date,
			notes: notes ? JSON.stringify(notes) : "[]",
			city: city,
			coins: coins,
		});

		// TODO (pedro): Verificar se o utilizador tem moedas suficientes e retirar-lhe as moedas

		return utils.handleResponse(
			res,
			utils.http.StatusCreated,
			"Sitting added successfully",
			{
				sitting: {
					id: newSitting.id,
					animal_id: newSitting.animal_id,
					owner_id: newSitting.owner_id,
					email_contact: newSitting.email_contact,
					phone_contact: newSitting.phone_contact,
					start_date: newSitting.start_date,
					end_date: newSitting.end_date,
					notes: JSON.parse(newSitting.notes),
					city: newSitting.city,
					coins: newSitting.coins,
					created_at: newSitting.createdAt,
					updated_at: newSitting.updatedAt,
				},
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = addAnimalSitting;
