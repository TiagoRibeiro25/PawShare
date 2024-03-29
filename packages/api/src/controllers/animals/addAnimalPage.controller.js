const db = require("../../db");
const utils = require("../../utils");
const services = require("../../services");
const config = require("../../config");

/**
 * @typedef AddAnimalPageBody
 * @property {string} name - The name (required)
 * @property {string} type - The type (required)
 * @property {string} gender - The gender (required)
 * @property {string} color - The color (required)
 * @property {string} size - The size (required)
 * @property {string} description - The description (required)
 */

/**
 * Add animal page
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function addAnimalPage(req, res) {
	try {
		/** @type {number} */
		const loggedUserId = req.userId;

		/** @type {AddAnimalPageBody} */
		const { name, type, gender, color, size, description, picture } = req.body;

		const animalPage = await db.mysql.Animal.create({
			owner_id: loggedUserId,
			name: name,
			type: type,
			gender: gender,
			color: color,
			size: size,
			description: description,
		});

		const pictureResult = await services.cloudinary.uploader.upload(picture, {
			folder: config.cloudinary.folderName + "/animals",
			crop: "limit",
			transformation: { width: 500, height: 500, crop: "limit" },
		});

		const animalPicture = await db.mysql.Picture.create({
			animal_id: animalPage.id,
			provider_id: pictureResult.public_id,
			provider_url: pictureResult.secure_url,
		});

		return utils.handleResponse(res, utils.http.StatusCreated, "Animal page created", {
			animal: {
				id: animalPage.id,
				owner_id: loggedUserId,
				name: animalPage.name,
				type: animalPage.type,
				gender: addAnimalPage.gender,
				color: animalPage.color,
				size: animalPage.size,
				description: animalPage.description,
				picture: animalPicture.provider_url || null,
			},
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = addAnimalPage;
