const db = require("../../db");
const utils = require("../../utils");

async function acceptSittingCandidate(req, res) {
	try {
		const { sittingId, candidateId } = req.params;

		const candidate = await db.mysql.UsersList.findOne({
			attributes: ["id", "is_confirmed"],
			where: {
				sitting_id: sittingId,
				user_id: candidateId,
			},
			include: [
				{
					model: db.mysql.Sitting,
					as: "sitting",
					attributes: ["is_closed", "owner_id"],
				},
			],
		});

		if (!candidate) {
			utils.handleResponse(res, utils.http.StatusNotFound, "Candidate not found");
			return;
		}

		if (candidate.sitting.owner_id !== req.userId) {
			utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You are not the owner of this sitting request",
			);
			return;
		}

		if (candidate.is_confirmed) {
			utils.handleResponse(res, utils.http.StatusConflict, "Candidate already accepted");
			return;
		}

		if (candidate.sitting.is_closed) {
			utils.handleResponse(res, utils.http.StatusConflict, "Sitting is already closed");
			return;
		}

		await db.mysql.Sitting.update(
			{ is_closed: true },
			{
				where: {
					id: sittingId,
				},
			},
		);

		await db.mysql.UsersList.update(
			{ is_confirmed: true },
			{
				where: {
					id: candidate.id,
				},
			},
		);

		utils.handleResponse(res, utils.http.StatusNoContent);
	} catch (error) {
		utils.handleResponse(res, utils.http.StatusInternalServerError, error.message);
	}
}

module.exports = acceptSittingCandidate;
