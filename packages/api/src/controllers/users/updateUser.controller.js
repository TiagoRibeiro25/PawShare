const db = require("../../db");
const utils = require("../../utils");
const countries = require("../../data/countries.json");
const services = require("../../services");
const config = require("../../config");

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
		const dataToUpdate = req.body;

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

		if (dataToUpdate.email) {
			// Check if the new email is already in use
			const userWithEmail = await db.mysql.User.findOne({
				where: { email: dataToUpdate.email },
				attributes: ["id"],
			});

			if (userWithEmail) {
				utils.handleResponse(res, utils.http.StatusConflict, "Email already in use");
				return;
			}

			// TODO (tiago): Send a confirmation email to the new email address and update the user's email only after the user confirms it (nice to have)
		}

		if (dataToUpdate.selected_frame) {
			// Convert the frame to a number (just in case if it's a string)
			dataToUpdate.selected_frame = +dataToUpdate.selected_frame;

			if (!JSON.parse(user.frames).includes(+dataToUpdate.selected_frame)) {
				utils.handleResponse(res, utils.http.StatusForbidden, "Invalid frame");
				return;
			}
		}

		if (dataToUpdate.selected_banner) {
			// Convert the banner to a number (just in case if it's a string)
			dataToUpdate.selected_banner = +dataToUpdate.selected_banner;

			if (!JSON.parse(user.banners).includes(+dataToUpdate.selected_banner)) {
				utils.handleResponse(res, utils.http.StatusForbidden, "Invalid banner");
				return;
			}
		}

		if (dataToUpdate.picture) {
			// Check if the user already has a picture (already uploaded one before)
			if (user.picture) {
				const result = await services.cloudinary.uploader.upload(dataToUpdate.picture, {
					public_id: user.picture.provider_id,
					overwrite: true,
					transformation: { width: 150, height: 150, crop: "limit" },
				});

				// Update the picture in the database
				await user.picture.update({
					provider_id: result.public_id,
					provider_url: result.secure_url,
				});
			}

			// If the user doesn't have a picture (it's the first time he uploads one)
			else {
				const result = await services.cloudinary.uploader.upload(dataToUpdate.picture, {
					folder: config.cloudinary.folderName + "/users",
					crop: "limit",
					transformation: { width: 150, height: 150, crop: "limit" },
				});

				// Create the picture in the database
				const userNewPicture = await db.mysql.Picture.create({
					user_id: user.id,
					provider_id: result.public_id,
					provider_url: result.secure_url,
				});

				user.picture = {
					id: userNewPicture.id,
					provider_id: userNewPicture.provider_id,
					provider_url: userNewPicture.provider_url,
				};
			}
		}

		// Remove the picture from the object (so it doesn't try to update the user table with it)
		delete dataToUpdate.picture;

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
				created_at: user.createdAt,
				updated_at: user.updatedAt,
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
