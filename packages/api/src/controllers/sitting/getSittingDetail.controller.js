const db = require("../../db");
const utils = require("../../utils");

const QUERY_ATTRIBUTES = {
	sitting: [
		"id",
		"email_contact",
		"phone_contact",
		"notes",
		"city",
		"coins",
		"start_date",
		"end_date",
		"createdAt",
		"updatedAt",
	],
	animal: ["id", "owner_id", "name", "type", "gender", "color", "size", "description"],
	picture: ["provider_url"],
	user: ["display_name"],
	review: ["sitting_id", "rating"],
};

/**
 * Returns the detail of one sitting
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */

async function getSittingDetail(req, res) {
	try {
		// The sitting id
		const { id } = req.params;

		/** @type {number} */
		const loggedUser = req.userId;

		const sitting = await db.mysql.Sitting.findByPk(id, {
			attributes: QUERY_ATTRIBUTES.sitting,
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
				{
					model: db.mysql.Review,
					attributes: QUERY_ATTRIBUTES.review,
				},
			],
		});

		const data = sitting ? sitting.toJSON() : null;

		if (!data) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Sitting not found");
		}

		const responseData = {
			sitting: {
				id: data.id,
				email_contact: data.email_contact,
				phone_contact: data.phone_contact,
				city: data.city,
				notes: JSON.parse(data.notes.replace(/'/g, '"')),
				coins: data.coins,
				rating: data.review.rating,
				start_date: data.start_date,
				end_date: data.end_date,
				animal: {
					id: data.animal.id,
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

		// If the logged user is the owner of the animal
		if (data.animal.owner_id === loggedUser) {
			utils.handleResponse(res, utils.http.StatusOK, "Sitting retrieved successfully", {
				isOwner: true, // Key flag for the FE
				...responseData,
			});

			return;
		}

		// If the logged user is not the owner of the animal
		utils.handleResponse(res, utils.http.StatusOK, "Sitting retrieved successfully", {
			isOwner: false, // Key flag for the FE
			sitting: {
				...responseData.sitting,
				animal: {
					id: data.animal.id,
					owner: {
						id: data.animal.owner_id,
						name: data.user.display_name,
						picture:
							data.user.picture?.provider_url ||
							utils.pictures.getUserPictureUrl(data.user.display_name),
					},
					...responseData.sitting.animal,
				},
			},
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getSittingDetail;
