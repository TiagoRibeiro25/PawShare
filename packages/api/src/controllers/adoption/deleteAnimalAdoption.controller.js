const db = require("../../db");
const utils = require("../../utils");

/**
 * Delete one adoption
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 *  */

async function deleteAnimalAdoption(req, res) {
	try {
		// The adoption id
		const { id } = req.params;

		/** @type {number} */
		const loggedUser = req.userId;

		const checkAdoption = await db.mysql.Adoption.findOne({
			where: {
				id: id,
				is_closed: false,
			},
		});

		// Checking if the adoption exists
		if (!checkAdoption) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Adoption not found");
		}

		// Checking	if the logged user is not the owner of the adoption
		if (checkAdoption.owner_id !== loggedUser) {
			return utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You can't delete this adoption",
			);
		}

		await db.mysql.Adoption.destroy({
			where: {
				id: id,
			},
		});

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Adoption deleted successfully",
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = deleteAnimalAdoption;
