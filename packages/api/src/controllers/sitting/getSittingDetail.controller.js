const db = require("../../db");
const utils = require("../../utils");
const { Op, Sequelize } = require("sequelize");

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
	animal: ["id", "name", "type", "gender", "color", "size", "description"],
	picture: ["provider_url"],
	user: ["id", "display_name"],
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
						// To find the adoptions of the animal
						{
							model: db.mysql.Adoption,
							where: {
								is_closed: true,
							},
							attributes: ["id"],
							required: false, // Left join
						},
						// To find the sittings of the animal
						{
							model: db.mysql.Sitting,
							where: {
								is_closed: true,
							},
							attributes: ["id"],
							required: false,
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

		const data = sitting ? sitting.toJSON() : null;

		if (!data) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Sitting not found");
		}

		const transaction = await db.mysql.sequelize.transaction();

		// Finding the average rating of the reviews
		const averageRating = await db.mysql.Review.findOne({
			attributes: [
				[
					Sequelize.literal("ROUND(AVG(rating), 1)"), // Round to 1 decimal place
					"average",
				],
			],
			where: {
				[Op.or]: [
					// Finding the adoptions and sittings reviews of the animal
					{
						adoption_id: {
							[Op.in]: data.animal.adoptions.map((adoption) => adoption.id),
						},
					},
					{
						sitting_id: { [Op.in]: data.animal.sittings.map((sitting) => sitting.id) },
					},
				],
			},
			transaction,
		});

		// Check if the logged user has already applied to this sitting
		const isCandidate = await db.mysql.UsersList.findOne({
			attributes: ["id"],
			where: {
				user_id: req.userId,
				sitting_id: id,
			},
			transaction,
		});

		await transaction.commit();

		const responseData = {
			sitting: {
				id: data.id,
				email_contact: data.email_contact,
				phone_contact: data.phone_contact,
				city: data.city,
				notes: JSON.parse(data.notes.replace(/'/g, '"')),
				coins: data.coins,
				rating: +averageRating.toJSON().average,
				is_candidate: !!isCandidate,
				start_date: data.start_date,
				end_date: data.end_date,
				animal: {
					id: data.animal.id,
					owner: {
						id: data.user.id,
						name: data.user.display_name,
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
					picture: data.animal.picture?.provider_url || null,
				},
				created_at: data.createdAt,
				updated_at: data.updatedAt,
			},
		};

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Sitting retrieved successfully",
			responseData,
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getSittingDetail;
