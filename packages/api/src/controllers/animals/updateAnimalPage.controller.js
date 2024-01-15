const db = require("../../db");
const services = require("../../services");
const utils = require("../../utils");

async function updateAnimalPage(req, res) {
	try {
		const loggedUserId = req.userId;
		const animalId = req.params.id;

		const { name, type, gender, color, size, description, picture } = req.body;

		// Find the animal page to update
		const animalPage = await db.mysql.Animal.findByPk(animalId, {
			include: [
				{
					model: db.mysql.Picture,
					as: "picture",
					attributes: ["id", "provider_id", "provider_url"],
				},
			],
		});

		// Check if the animal page exists
		if (!animalPage) {
			return utils.handleResponse(
				res,
				utils.http.StatusNotFound,
				"Animal page not found",
			);
		}

		// Check if the logged-in user is the owner of the animal page
		if (animalPage.owner_id !== loggedUserId) {
			return utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You are not the owner of this animal page",
			);
		}

		// Update the fields
		await animalPage.update({
			name,
			type,
			gender,
			color,
			size,
			description,
		});

		if (picture) {
			const pictureResult = await services.cloudinary.uploader.upload(picture, {
				public_id: animalPage.picture.provider_id,
				overwrite: true,
				transformation: { width: 500, height: 500, crop: "limit" },
			});

			// Update the picture in the database
			await animalPage.picture.update({
				provider_id: pictureResult.public_id,
				provider_url: pictureResult.secure_url,
			});
		}

		return utils.handleResponse(res, utils.http.StatusCreated, "Animal page updated", {
			animal: {
				id: animalPage.id,
				animal_id: animalPage.animal_id,
				owner_id: loggedUserId,
				name: animalPage.name,
				type: animalPage.type,
				gender: animalPage.gender,
				color: animalPage.color,
				size: animalPage.size,
				description: animalPage.description,
				picture: animalPage.picture.provider_url,
			},
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = updateAnimalPage;
