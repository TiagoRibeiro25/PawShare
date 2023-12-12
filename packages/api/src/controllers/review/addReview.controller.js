const utils = require("../../utils");
const db = require("../../db");

/**
 * @typedef AddReviewBody
 * @property {number} id - The adoption/sitting id
 * @property {number} rating - The rating (1-5)
 * @property {string?} comment - The comment (8-255 characters)
 */

/**
 * Add a new review
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function addReview(req, res) {
	//TODO: Not tested

	try {
		/** @type {number} */
		const loggedUserId = req.userId;

		/** @type {"adoption" | "sitting"} */
		const type = req.query.type;

		/** @type {AddReviewBody} */
		const { id, rating, comment } = req.body;

		const modelName = utils.formatData.capitalizeFirstLetter(type);

		// Adoption / Sitting
		const activity = await db.mysql[modelName].findOne({
			where: { id },
			include: [
				{
					model: db.mysql.UsersList,
					as: "users_list",
					where: { is_confirmed: true },
				},
			],
		});

		// Check if the adoption/sitting exists
		if (!activity) {
			utils.handleResponse(res, utils.http.StatusNotFound, `${modelName} not found`);
			return;
		}

		// Check if there's someone assigned to the adoption/sitting
		if (!activity.users_list.length) {
			utils.handleResponse(res, utils.http.StatusBadRequest, "No one assigned to this");
			return;
		}

		// Check if the user is the creator of the adoption/sitting or if he's the one who requested it
		if (
			activity.owner_id !== loggedUserId &&
			activity.users_list[0].user_id !== loggedUserId
		) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				`You can't review this $${type}`,
			);
			return;
		}

		// Check if the user already reviewed this adoption/sitting
		const review = await db.mysql.Review.findOne({
			where: {
				[`${type}_id`]: id, // "adoption_id" | "sitting_id"
				user_id: loggedUserId,
			},
		});

		if (review) {
			utils.handleResponse(res, utils.http.StatusBadRequest, "You already reviewed this");
			return;
		}

		// If it's a sitting, check if it's finished
		if (type === "sitting" && new Date(activity.end_date) > new Date()) {
			utils.handleResponse(res, utils.http.StatusBadRequest, "Sitting not finished yet");
			return;
		}

		const userType = activity.owner_id === loggedUserId ? "owner" : "sitter";

		// Create the review
		const newReview = await db.mysql.Review.create({
			[`${type}_id`]: id, // "adoption_id" | "sitting_id"
			type: type === "sitting" ? userType : null, // Only present if it's a sitting review
			rating,
			comment: comment?.trim(),
		});

		utils.handleResponse(res, utils.http.StatusCreated, "Review added successfully", {
			review: {
				id: newReview.id,
				[`${type}_id`]: newReview[`${type}_id`], // "adoption_id" | "sitting_id"
				type: newReview.type,
				rating: newReview.rating,
				comment: newReview.comment,
				created_at: newReview.createdAt,
				update_at: newReview.updatedAt,
			},
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = addReview;
