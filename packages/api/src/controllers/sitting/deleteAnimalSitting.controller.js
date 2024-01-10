const db = require("../../db");
const utils = require("../../utils");

/**
 * Delete one sitting
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 *  */

async function deleteAnimalSitting(req, res) {
	try {
		// The sitting id
		const { id } = req.params;

		/** @type {number} */
		const loggedUser = req.userId;

		const checkSitting = await db.mysql.Sitting.findOne({
			where: {
				id: id,
				is_closed: false,
			},
		});

		// Checking if the sitting exists
		if (!checkSitting) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Sitting not found");
		}

		// Checking	if the logged user is not the owner of the sitting
		if (checkSitting.owner_id !== loggedUser) {
			return utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You can't delete this sitting",
			);
		}

		await db.mysql.Sitting.destroy({
			where: {
				id: id,
			},
		});

		return utils.handleResponse(res, utils.http.StatusOK, "Sitting deleted successfully");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = deleteAnimalSitting;
