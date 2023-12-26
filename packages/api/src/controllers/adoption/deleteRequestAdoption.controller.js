const db = require("../../db");
const utils = require("../../utils");

/**
 * Cancel one requested adoption
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 *  */

const deleteRequestAdoption = async (req, res) => {
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
			include: [
				{
					model: db.mysql.UsersList,
					where: {
						adoption_id: id,
					},
				},
			],
		});

		// Checking if the adoption exists
		if (!checkAdoption) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Adoption not found");
		}

		// Checking if the logged user is in the candidates list of the adoption
		const isCandidate = checkAdoption.users_lists.some(
			(candidate) => candidate.user_id === loggedUser,
		);

		if (!isCandidate) {
			return utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You are not a candidate of this adoption",
			);
		}

		await db.mysql.UsersList.destroy({
			where: {
				adoption_id: id,
				user_id: loggedUser,
			},
		});

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Requested adoption canceled successfully",
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
};

module.exports = deleteRequestAdoption;
