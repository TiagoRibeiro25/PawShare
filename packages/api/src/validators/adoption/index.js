const getAdoptionDetail = require("./getAdoptionDetail.validator");
const getAdoptionsFeed = require("./getAdoptionsFeed.validator");
const addAnimalAdoption = require("./addAnimalAdoption.validator");
const addCandidateAdoption = require("./addCandidateAdoption.validator");
const getRequestedAdoptions = require("./getRequestedAdoptions.validator");

module.exports = {
	getAdoptionDetail,
	getAdoptionsFeed,
	addAnimalAdoption,
	addCandidateAdoption,
	getRequestedAdoptions,
};
