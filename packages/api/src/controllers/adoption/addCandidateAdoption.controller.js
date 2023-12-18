const db = require("../../db");
const utils = require("../../utils");

/**
 * Candidate to adopt an animal
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */

async function addCandidateAdoption(req, res) {
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

		// Checking	if the logged user is the owner of the animal
		if (checkAdoption.owner_id === loggedUser) {
			return utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You can't candidate to adopt your own animal",
			);
		}

		const checkCandidate = await db.mysql.UsersList.findOne({
			where: {
				user_id: loggedUser,
				adoption_id: id,
			},
		});

		// Checking if the logged user is already a candidate to adopt the animal
		if (checkCandidate) {
			return utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"You're already a candidate to adopt this animal",
			);
		}

		// Adding the user to the candidates list
		const newCandidate = await db.mysql.UsersList.create({
			user_id: loggedUser,
			adoption_id: +id,
		});

		return utils.handleResponse(
			res,
			utils.http.StatusCreated,
			"Candidate added successfully",
			{
				candidate: {
					id: newCandidate.id,
					user_id: newCandidate.user_id,
					adoption_id: newCandidate.adoption_id,
					is_confirmed: newCandidate.is_confirmed,
					created_at: newCandidate.createdAt,
					updated_at: newCandidate.updatedAt,
				},
			},
		);
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = addCandidateAdoption;
