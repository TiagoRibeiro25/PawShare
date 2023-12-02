const db = require("../../db");
const utils = require("../../utils");
const countries = require("../../data/countries.json");

/**
 * @typedef UpdateUserBody
 * @property {string | undefined} display_name - The user's display name
 * @property {string | undefined} email - The user's email
 * @property {string | undefined} country - The user's country
 * @property {string | undefined} description - The user's description
 * @property {number | undefined} selected_frame - The user's selected frame
 * @property {number | undefined} selected_banner - The user's selected banner
 * @property {string | undefined} picture - The user's picture
 */

/**
 * Updates the logged user.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
async function updateUser(req, res) {
	try {
		/** @type {UpdateUserBody} */
		const dataToUpdate = req.body.map((key) => {
			// If it is selected_frame or selected_banner, convert it to number
			return key === "selected_frame" || key === "selected_banner"
				? { [key]: +req.body[key] }
				: { [key]: req.body[key] };
		});

		const user = await db.mysql.User.findByPk(req.userId, {
			include: [
				{
					model: db.mysql.Picture,
					as: "picture",
					attributes: ["id", "provider_id", "provider_url"],
				},
				{
					model: db.mysql.Animal,
					as: "animals",
					attributes: ["id", "name"],
					include: [
						{
							model: db.mysql.Picture,
							as: "picture",
							attributes: ["id", "provider_id", "provider_url"],
						},
					],
				},
			],
		});

		// Check if the new data is the same as the old one (except for the picture)
		Object.keys(dataToUpdate).forEach((key) => {
			if (dataToUpdate[key] === user[key]) {
				// Remove the key from the object so it doesn't get updated with the same value
				delete dataToUpdate[key];
			}
		});

		// Check if there is any data to update
		if (Object.keys(dataToUpdate).length === 0) {
			utils.handleResponse(res, utils.http.StatusBadRequest, "No data to update");
			return;
		}

		// Check if the new email is already in use (if the user is trying to change it)
		if (dataToUpdate.email) {
			const userWithEmail = await db.mysql.User.findOne({
				where: { email: dataToUpdate.email },
				attributes: ["id"],
			});

			if (userWithEmail) {
				utils.handleResponse(res, utils.http.StatusConflict, "Email already in use");
				return;
			}

			// TODO: Send a confirmation email to the new email address and update the user's email only after the user confirms it (nice to have)
		}

		// Check if the user has the frame
		if (
			dataToUpdate.selected_frame &&
			!JSON.parse(user.frames).includes(+dataToUpdate.selected_frame)
		) {
			utils.handleResponse(res, utils.http.StatusForbidden, "Invalid frame");
			return;
		}

		// Check if the user has the banner
		if (
			dataToUpdate.selected_banner &&
			!JSON.parse(user.banners).includes(+dataToUpdate.selected_banner)
		) {
			utils.handleResponse(res, utils.http.StatusForbidden, "Invalid banner");
			return;
		}

		//TODO: Handle picture upload (setup up cloudinary first)

		// Remove the picture from the object (so it doesn't try to update the user table with it)
		delete dataToUpdate.picture;

		// Update the user
		await user.update(dataToUpdate);

		utils.handleResponse(res, utils.http.StatusOK, "User updated successfully", {
			user: {
				id: user.id,
				display_name: user.display_name,
				email: user.email,
				type: user.type,
				country: countries.find((country) => country.code === user.country),
				description: user.description,
				coins: user.coins,
				badges: JSON.parse(user.badges),
				selected_frame: user.selected_frame,
				selected_banner: user.selected_banner,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				picture:
					user.picture?.provider_url ||
					utils.pictures.getUserPictureUrl(user.display_name),
				animals: user.toJSON().animals,
			},
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = updateUser;
