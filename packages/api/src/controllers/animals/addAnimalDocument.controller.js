const db = require("../../db");
const utils = require("../../utils");

async function addDocument(req, res) {
	try {
		const loggedUserId = req.userId;
		const animalId = req.params.id;

		const { name, image } = req.body;
		// turn image into blob
		const imageBlob = Buffer.from(image, "base64");

		const animalPage = await db.mysql.Animal.findByPk(animalId);

		if (!animalPage) {
			return utils.handleResponse(
				res,
				utils.http.StatusNotFound,
				"Animal page not found",
			);
		}

		if (animalPage.owner_id !== loggedUserId) {
			return utils.handleResponse(
				res,
				utils.http.StatusUnauthorized,
				"Unauthorized to update this animal page",
			);
		}

		await db.mysql.AnimalDocument.create({
			animal_id: animalId,
			name: name,
			document: imageBlob,
		});

		return utils.handleResponse(res, utils.http.StatusCreated, "Document added");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = addDocument;
