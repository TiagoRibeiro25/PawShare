const verifyUser = require("./verifyUser.validator");
const getUser = require("./getUser.validator");
const updateUser = require("./updateUser.validator");
const handleCoins = require("./handleCoins.validator");
const buyItem = require("./buyItem.validator");

module.exports = {
	verifyUser,
	getUser,
	updateUser,
	handleCoins,
	buyItem,
};
