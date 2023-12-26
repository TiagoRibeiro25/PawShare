const getSittingsFeed = require("./getSittingsFeed.validator");
const getRequestedSittings = require("./getRequestedSittings.validator");
const getSittingDetail = require("./getSittingDetail.validator");
const addAnimalSitting = require("./addAnimalSitting.validator");
const deleteAnimalSitting = require("./deleteAnimalSitting.validator");

module.exports = {
	getSittingsFeed,
	getRequestedSittings,
	getSittingDetail,
	addAnimalSitting,
	deleteAnimalSitting,
};
