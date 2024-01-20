const { body } = require("express-validator");

function validator() {
	return [
		body("name").isString().withMessage("Invalid animal name"),
		body("gender")
			.isString()
			.isIn(["Male", "Female", "Other"])
			.withMessage("Gender must be Male, Female, or Other"),
		body("type")
			.isString()
			.isIn([
				"alpaca",
				"badger",
				"bat",
				"beaver",
				"bird",
				"canary",
				"cat",
				"chameleon",
				"cow",
				"dog",
				"donkey",
				"elephant",
				"fish",
				"fox",
				"frog",
				"giraffe",
				"goat",
				"hamster",
				"hippopotamus",
				"horse",
				"iguana",
				"kangaroo",
				"koala",
				"lion",
				"lizard",
				"monkey",
				"mouse",
				"panda",
				"parrot",
				"pig",
				"rabbit",
				"rat",
				"snake",
				"turtle",
				"whale",
				"wolf",
				"zebra",
			])
			.withMessage("Invalid animal type"),
		body("size")
			.isString()
			.isIn(["Small", "Medium", "Large"])
			.withMessage("Invalid animal size"),
		body("color")
			.isString()
			.isIn([
				"black",
				"brown",
				"red",
				"orange",
				"yellow",
				"green",
				"blue",
				"violet",
				"pink",
				"grey",
				"white",
				"other",
			])
			.withMessage("Invalid animal color"),
		body("description").isString().withMessage("Invalid animal description"),
	];
}

module.exports = validator;
