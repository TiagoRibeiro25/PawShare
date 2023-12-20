const getAnimalDetail = require("./animalDetail.controller");
const addAnimalPage = require("./addAnimalPage.controller");
const updateAnimalPage = require("./updateAnimalPage.controller");
const addDocument = require("./addAnimalDocument.controller");
const getDocument = require("./getAnimalDocument.controller");
const deleteDocument = require("./deleteAnimalDocument.controller");

module.exports = {
	getAnimalDetail,
	addAnimalPage,
	updateAnimalPage,
	addDocument,
	getDocument,
	deleteDocument,
};
