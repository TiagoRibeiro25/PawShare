const getAdoptionDetail = require("./adoptionDetail.controller");
const getAdoptionsFeed = require("./getAdoptionsFeed.controller");
const getRequestedAdoptions = require("./getRequestedAdoptions.controller");
const addAnimalAdoption = require("./addAnimalAdoption.controller");
const addCandidateAdoption = require("./addCandidateAdoption.controller");
const deleteAnimalAdoption = require("./deleteAnimalAdoption.controller");
const deleteRequestAdoption = require("./deleteRequestAdoption.controller");
const getCreatedAdoptions = require("./getCreatedAdoptions.controller");
const getCandidates = require("./getCandidates.controller");
const acceptAdoptionCandidate = require("./acceptAdoptionCandidate.controller");

module.exports = {
	getAdoptionDetail,
	getAdoptionsFeed,
	getRequestedAdoptions,
	addAnimalAdoption,
	addCandidateAdoption,
	deleteAnimalAdoption,
	deleteRequestAdoption,
	getCreatedAdoptions,
	getCandidates,
	acceptAdoptionCandidate,
};
