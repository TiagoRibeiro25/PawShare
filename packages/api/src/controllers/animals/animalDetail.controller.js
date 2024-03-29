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
	user: ["id", "display_name"],
};

/**
 * Get animal detail
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function getAnimalDetail(req, res) {
	try {
		const animal = await db.mysql.Animal.findByPk(req.params.id, {
			attributes: QUERY_ATTRIBUTES.animal,
			include: [
				{
					model: db.mysql.Picture,
					attributes: QUERY_ATTRIBUTES.picture,
				},
				{
					model: db.mysql.User,
					attributes: QUERY_ATTRIBUTES.user,
					include: [
						{
							model: db.mysql.Picture,
							attributes: QUERY_ATTRIBUTES.picture,
						},
					],
				},
			],
		});

		const data = animal ? animal.toJSON() : null;

		if (!data) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Animal not found");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Animal found", {
			animal: {
				id: data.id,
				name: data.name,
				type: data.type,
				gender: data.gender,
				color: data.color,
				size: data.size,
				description: data.description,
				picture: data.picture?.provider_url || null,
				user: {
					id: data.user.id,
					display_name: data.user.display_name,
					picture:
						data.user.picture?.provider_url ||
						utils.pictures.getUserPictureUrl(data.user.display_name),
				},
				created_at: data.createdAt,
				updated_at: data.updatedAt,
			},
		});
	} catch (error) {
		return utils.handleResponse(res, utils.http.StatusInternalServerError, error.message);
	}
}

module.exports = getAnimalDetail;
