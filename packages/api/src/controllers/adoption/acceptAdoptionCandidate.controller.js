const db = require("../../db");
const utils = require("../../utils");

/**
 * Accepts a candidate to adopt an animal
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */
async function acceptAdoptionCandidate(req, res) {
	try {
		const { adoptionId, candidateId } = req.params;

		const candidate = await db.mysql.UsersList.findOne({
			attributes: ["id", "is_confirmed"],
			where: {
				adoption_id: adoptionId,
				user_id: candidateId,
			},
			include: [
				{
					model: db.mysql.Adoption,
					as: "adoption",
					attributes: ["is_closed", "owner_id"],
				},
			],
		});

		if (!candidate) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Candidate not found");
			return;
		}

		if (candidate.adoption.owner_id !== req.userId) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You are not the owner of this adoption",
			);
			return;
		}

		if (candidate.is_confirmed) {
			utils.handleResponse(res, utils.http.StatusConflict, "Candidate already accepted");
			return;
		}

		if (candidate.adoption.is_closed) {
			utils.handleResponse(res, utils.http.StatusConflict, "Adoption is already closed");
			return;
		}

		const transaction = await db.mysql.sequelize.transaction();

		await db.mysql.Adoption.update(
			{ is_closed: true },
			{
				where: {
					id: adoptionId,
				},
			},
			transaction,
		);

		await db.mysql.UsersList.update(
			{ is_confirmed: true },
			{
				where: {
					user_id: candidateId,
					adoption_id: adoptionId,
				},
			},
			transaction,
		);

		await transaction.commit();

		utils.handleResponse(res, utils.http.StatusOK, "Candidate accepted");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = acceptAdoptionCandidate;
