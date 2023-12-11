const db = require("../../db");
const utils = require("../../utils");

const QUERY_ATTRIBUTES = {
	adoption: [
		"id",
		"email_contact",
		"phone_contact",
		"notes",
		"city",
		"createdAt",
		"updatedAt",
	],
	animal: ["id", "owner_id", "name", "type", "gender", "color", "size", "description"],
	picture: ["provider_url"],
	user: ["display_name"],
};

/**
 * Returns the detail of one adoption
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */

async function getAdoptionDetail(req, res) {
	// The adoption id
	try {
		const { id } = req.params;

		/** @type {number} */
		const loggedUser = req.userId; // The logged user id from the request header

		const adoption = await db.mysql.Adoption.findByPk(id, {
			attributes: QUERY_ATTRIBUTES.adoption,
			include: [
				{
					model: db.mysql.Animal,
					attributes: QUERY_ATTRIBUTES.animal,
					include: [
						{
							model: db.mysql.Picture,
							attributes: QUERY_ATTRIBUTES.picture,
						},
					],
				},
				{
					model: db.mysql.User,
					attributes: QUERY_ATTRIBUTES.user,
				},
			],
		});

		const data = adoption ? adoption.toJSON() : null;

		// If the adoption data is not found
		if (data === null) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Adoption not found");
		}

		const responseData = {
			adoption: {
				id: data.id,
				email_contact: data.email_contact,
				phone_contact: data.phone_contact,
				city: data.city,
				notes: JSON.parse(data.notes.replace(/'/g, '"')).map((note, index) => ({
					id: index + 1,
					note,
				})),
				animal: {
					name: data.animal.name,
					type: data.animal.type,
					gender: data.animal.gender,
					color: data.animal.color,
					size: data.animal.size,
					description: data.animal.description,
					picture: data.animal.picture,
				},
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
			},
		};

		// If the logged user is the owner of the animal
		if (data.animal.owner_id === loggedUser) {
			utils.handleResponse(res, utils.http.StatusOK, "Adoption retrieved successfully", {
				isOwner: true, // Key flag for the FE
				...responseData,
			});

			return;
		}

		// If the logged user is not the owner of the animal
		utils.handleResponse(res, utils.http.StatusOK, "Adoption retrieved successfully", {
			isOwner: false, // Key flag for the FE
			adoption: {
				...responseData.adoption,
				animal: {
					owner: {
						id: data.animal.owner_id,
						name: data.user.display_name,
					},
					...responseData.adoption.animal,
				},
			},
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getAdoptionDetail;
