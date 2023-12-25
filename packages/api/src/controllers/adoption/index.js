const getAdoptionDetail = require("./adoptionDetail.controller");
const getAdoptionsFeed = require("./getAdoptionsFeed.controller");
const getRequestedAdoptions = require("./getRequestedAdoptions.controller");
const addAnimalAdoption = require("./addAnimalAdoption.controller");
const addCandidateAdoption = require("./addCandidateAdoption.controller");
const deleteAnimalAdoption = require("./deleteAnimalAdoption.controller");

module.exports = {
	getAdoptionDetail,
	getAdoptionsFeed,
	getRequestedAdoptions,
	addAnimalAdoption,
	addCandidateAdoption,
	deleteAnimalAdoption,
};
