const getSittingsFeed = require("./getSittingsFeed.controller");
const getRequestedSittings = require("./getRequestedSittings.controller");
const getSittingDetail = require("./getSittingDetail.controller");
const addAnimalSitting = require("./addAnimalSitting.controller");
const deleteAnimalSitting = require("./deleteAnimalSitting.controller");
const getCandidates = require("./getCandidates.controller");

module.exports = {
	getSittingsFeed,
	getRequestedSittings,
	getSittingDetail,
	addAnimalSitting,
	deleteAnimalSitting,
	getCandidates,
};
