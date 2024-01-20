const getSittingsFeed = require("./getSittingsFeed.validator");
const getRequestedSittings = require("./getRequestedSittings.validator");
const getSittingDetail = require("./getSittingDetail.validator");
const addAnimalSitting = require("./addAnimalSitting.validator");
const deleteAnimalSitting = require("./deleteAnimalSitting.validator");
const getCandidates = require("./getCandidates.validator");
const getCreatedSittings = require("./getCreatedSittings.validator");
const addCandidate = require("./addCandidate.validator");
const deleteCandidate = require("./deleteCandidate.validator");
const acceptSittingCandidate = require("./acceptSittingCandidate.validator");
const completePayment = require("./completePayment.validator");

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
	completePayment,
};
