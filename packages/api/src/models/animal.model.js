const { Sequelize, DataTypes } = require("sequelize");
const animalTypes = require("../data/animals.json");
const colors = require("../data/colors.json");

/**
 * @param {Sequelize} sequelize
 */
const AnimalModel = (sequelize) => {
	return sequelize.define(
		"animal",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			owner_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: [animalTypes],
				},
			},
			gender: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: ["Male", "Female", "Other"],
				},
			},
			color: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: [colors],
				},
			},
			size: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: ["Small", "Medium", "Large"],
				},
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "animal",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "owner_id",
					using: "BTREE",
					fields: [{ name: "owner_id" }],
				},
				{
					name: "animal_type",
					using: "BTREE",
					fields: [{ name: "type" }],
				},
				{
					name: "animal_gender",
					using: "BTREE",
					fields: [{ name: "gender" }],
				},
				{
					name: "animal_color",
					using: "BTREE",
					fields: [{ name: "color" }],
				},
				{
					name: "animal_size",
					using: "BTREE",
					fields: [{ name: "size" }],
				},
			],
		},
	);
};

module.exports = AnimalModel;
