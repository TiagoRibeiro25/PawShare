const db = require("../../db");
const utils = require("../../utils");

async function deleteDocument(req, res) {
	try {
		const loggedUserId = req.userId;
		const animalId = req.params.animalId;
		const documentId = req.params.documentId;

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

		const document = await db.mysql.AnimalDocument.findOne({
			where: {
				id: documentId,
				animal_id: animalId,
			},
		});

		if (!document) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Document not found");
		}

		await document.destroy();

		return utils.handleResponse(res, utils.http.StatusOK, "Document deleted");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = deleteDocument;
