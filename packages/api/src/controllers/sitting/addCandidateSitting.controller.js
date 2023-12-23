const db = require("../../db");
const utils = require("../../utils");

async function addCandidateSitting(req, res) {
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
                "You can't candidate to sit your own animal",
            );
        }

        const checkCandidate = await db.mysql.UsersList.findOne({
            where: {
                user_id: loggedUser,
                sitting_id: id,
            },
        });

        if (checkCandidate) {
            return utils.handleResponse(
                res,
                utils.http.StatusConflict,
                "You're already a candidate to sit this animal",
            );
        }

        const newCandidate = await db.mysql.UsersList.create({
            user_id: loggedUser,
            sitting_id: +id,
        });

        return utils.handleResponse(res, utils.http.StatusCreated, "Candidate added successfully", {
            candidate: {
                id: newCandidate.id,
                user_id: newCandidate.user_id,
                sitting_id: newCandidate.sitting_id,
                is_confirmed: newCandidate.is_confirmed,
            },
        });
    } catch (error) {
        return utils.handleResponse(res, error, __filename);
    }
}

module.exports = addCandidateSitting;