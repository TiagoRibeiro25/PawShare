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
	animal: ["id", "name", "type", "gender", "color", "size", "description"],
	picture: ["provider_url"],
	user: ["id", "display_name"],
};

/**
 * Returns the detail of one adoption
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */

async function getAdoptionDetail(req, res) {
	try {
		// The adoption id
		const { id } = req.params;

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
					include: [
						{
							model: db.mysql.Picture,
							attributes: QUERY_ATTRIBUTES.picture,
						},
					],
				},
			],
		});

		const data = adoption ? adoption.toJSON() : null;

		if (!data) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Adoption not found");
		}

		const responseData = {
			adoption: {
				id: data.id,
				email_contact: data.email_contact,
				phone_contact: data.phone_contact,
				city: data.city,
				notes: JSON.parse(data.notes.replace(/'/g, '"')),
				animal: {
					id: data.animal.id,
					owner: {
						id: data.user.id,
						display_name: data.user.display_name,
						picture:
							data.user.picture?.provider_url ||
							utils.pictures.getUserPictureUrl(data.user.display_name),
					},
					name: data.animal.name,
					type: data.animal.type,
					gender: data.animal.gender,
					color: data.animal.color,
					size: data.animal.size,
					description: data.animal.description,
					picture: data.animal.picture.provider_url,
				},
				created_at: data.createdAt,
				updated_at: data.updatedAt,
			},
		};

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Adoption retrieved successfully",
			responseData,
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getAdoptionDetail;
