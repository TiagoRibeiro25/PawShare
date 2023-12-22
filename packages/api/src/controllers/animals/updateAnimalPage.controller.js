const db = require("../../db");
const utils = require("../../utils");

async function updateAnimalPage(req, res) {
	try {
		const loggedUserId = req.userId;
		const animalId = req.params.id;

		const { name, type, gender, color, size, description } = req.body;

		// Find the animal page to update
		const animalPage = await db.mysql.Animal.findByPk(animalId);

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
				utils.http.StatusUnauthorized,
				"Unauthorized to update this animal page",
			);
		}

		// Update the fields
		animalPage.name = name;
		animalPage.type = type;
		animalPage.gender = gender;
		animalPage.color = color;
		animalPage.size = size;
		animalPage.description = description;

		// Save the changes
		await animalPage.save();

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
			},
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = updateAnimalPage;
