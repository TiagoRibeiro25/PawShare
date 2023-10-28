const { Sequelize, DataTypes } = require("sequelize");
const animalTypes = require("../data/animals.json");

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
			picture_id: {
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
				defaultValue: false,
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
			birth_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			qr_code: {
				type: DataTypes.STRING(255),
				allowNull: false,
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
					name: "picture_id",
					using: "BTREE",
					fields: [{ name: "picture_id" }],
				},
				{
					name: "qr_code",
					using: "BTREE",
					fields: [{ name: "qr_code" }],
				},
			],
		},
	);
};

module.exports = AnimalModel;
