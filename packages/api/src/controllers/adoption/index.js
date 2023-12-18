const getAdoptionDetail = require("./adoptionDetail.controller");
const getAdoptionsFeed = require("./getAdoptionsFeed.controller");
const addAnimalAdoption = require("./addAnimalAdoption.controller");
const addCandidateAdoption = require("./addCandidateAdoption.controller");
const getRequestedAdoptions = require("./getRequestedAdoptions.controller");

module.exports = {
	getAdoptionDetail,
	getAdoptionsFeed,
	addAnimalAdoption,
	addCandidateAdoption,
	getRequestedAdoptions,
};
