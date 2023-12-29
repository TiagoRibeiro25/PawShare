const getSittingsFeed = require("./getSittingsFeed.controller");
const getRequestedSittings = require("./getRequestedSittings.controller");
const getSittingDetail = require("./getSittingDetail.controller");
const addAnimalSitting = require("./addAnimalSitting.controller");
const deleteAnimalSitting = require("./deleteAnimalSitting.controller");
const getCandidates = require("./getCandidates.controller");
const getCreatedSittings = require("./getCreatedSittings.controller");
const addCandidate = require("./addCandidateSitting.controller");
const deleteCandidate = require("./deleteCandidateSitting.controller");
const acceptSittingCandidate = require("./acceptSittingCandidate.controller");

module.exports = {
	getSittingsFeed,
	getRequestedSittings,
	getSittingDetail,
	addAnimalSitting,
	deleteAnimalSitting,
	getCandidates,
	getCreatedSittings,
	addCandidate,
	deleteCandidate,
	acceptSittingCandidate,
};
