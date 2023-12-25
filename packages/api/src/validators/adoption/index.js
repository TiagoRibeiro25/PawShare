const getAdoptionDetail = require("./getAdoptionDetail.validator");
const getAdoptionsFeed = require("./getAdoptionsFeed.validator");
const getRequestedAdoptions = require("./getRequestedAdoptions.validator");
const addAnimalAdoption = require("./addAnimalAdoption.validator");
const addCandidateAdoption = require("./addCandidateAdoption.validator");
const deleteAnimalAdoption = require("./deleteAnimalAdoption.validator");

module.exports = {
	getAdoptionDetail,
	getAdoptionsFeed,
	getRequestedAdoptions,
	addAnimalAdoption,
	addCandidateAdoption,
	deleteAnimalAdoption,
};
