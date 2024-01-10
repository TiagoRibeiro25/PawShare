const db = require("../../db");
const utils = require("../../utils");

async function getDocuments(req, res) {
	try {
		const animalId = req.params.animalId;

		const animalPage = await db.mysql.Animal.findByPk(animalId, {
			attributes: [],
			include: [
				{
					model: db.mysql.AnimalDocument,
					as: "animal_documents",
					attributes: ["id", "name"],
				},
			],
		});

		const documents = animalPage.animal_documents;

		if (!animalPage) {
			return utils.handleResponse(
				res,
				utils.http.StatusNotFound,
				"Animal page not found",
			);
		}

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"The animal documents where retrieved with success!",
			{
				documents,
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = getDocuments;
