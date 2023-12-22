const db = require("../../db");
const utils = require("../../utils");

async function getDocument(req, res) {
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

		const document = await db.mysql.AnimalDocument.findOne({
			where: {
				id: documentId,
				animal_id: animalId,
			},
		});

		if (!document) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Document not found");
		}

		return utils.handleResponse(res, utils.http.StatusOK, {
			userId: loggedUserId,
			document,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}
module.exports = getDocument;
