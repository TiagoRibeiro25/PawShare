const db = require("../../db");
const utils = require("../../utils");

const QUERY_ATTRIBUTES = {
	animal: [
		"id",
		"name",
		"owner_id",
		"type",
		"gender",
		"color",
		"size",
		"description",
		"createdAt",
		"updatedAt",
	],
	picture: ["provider_url"],
	user: ["display_name"],
};

async function getAnimalDetail(req, res) {
	try {
		const { id } = req.params;

		// checl if the user is the logged user or not send in data
		/** @type {number} */
		const loggedUser = req.userId;

		const animal = await db.mysql.Animal.findByPk(id, {
			attributes: QUERY_ATTRIBUTES.animal,
			include: [
				{
					model: db.mysql.Picture,
					attributes: QUERY_ATTRIBUTES.picture,
				},
				{
					model: db.mysql.User,
					attributes: QUERY_ATTRIBUTES.user,
				},
			],
		});

		const data = animal ? animal.toJSON() : null;

		if (data === null) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Animal not found");
		}

		const responseData = {
			animal: {
				id: data.id,
				name: data.name,
				owner_id: data.owner_id,
				type: data.type,
				gender: data.gender,
				color: data.color,
				size: data.size,
				description: data.description,
				picture: data.picture,
			},
			user: {
				displayName: data.user.display_name,
			},
			createdAt: data.createdAt,
			updatedAt: data.updatedAt,
		};

		if (loggedUser === data.owner_id) {
			utils.handleResponse(res, utils.http.StatusOK, "Animal found", {
				isOwner: true,
				...responseData,
			});

			return;
		}

		// If the logged user is not the owner of the animal
		utils.handleResponse(res, utils.http.StatusOK, "Animal found", {
			isOwner: false,
			...responseData,
		});
	} catch (error) {
		return utils.handleResponse(res, utils.http.StatusInternalServerError, error.message);
	}
}

module.exports = getAnimalDetail;
