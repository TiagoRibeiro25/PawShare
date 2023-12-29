const db = require("../../db");
const utils = require("../../utils");

async function deleteCandidateSitting(req, res) {
	try {
		const { id } = req.params;

		/** @type {number} */
		const loggedUser = req.userId;

		const checkSitting = await db.mysql.Sitting.findOne({
			where: {
				id: id,
				is_closed: false,
			},
		});

		if (!checkSitting) {
			return utils.handleResponse(res, utils.http.StatusNotFound, "Sitting not found");
		}

		if (checkSitting.owner_id === loggedUser) {
			return utils.handleResponse(
				res,
				utils.http.StatusForbidden,
				"You can't stop being a candidate because you cant candidate to sit your own animal",
			);
		}

		const checkCandidate = await db.mysql.UsersList.findOne({
			where: {
				user_id: loggedUser,
				sitting_id: id,
			},
		});

		if (!checkCandidate) {
			return utils.handleResponse(
				res,
				utils.http.StatusConflict,
				"You're not a candidate to sit this animal",
			);
		}

		await checkCandidate.destroy();

		return utils.handleResponse(
			res,
			utils.http.StatusOK,
			"Candidate deleted successfully",
		);
	} catch (error) {
		return utils.handleResponse(res, utils.http.StatusInternalServerError, error.message);
	}
}

module.exports = deleteCandidateSitting;
