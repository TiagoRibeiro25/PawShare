const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const SittingModel = (sequelize) => {
	return sequelize.define(
		"sitting",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			animal_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			owner_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			city: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			email_contact: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			phone_contact: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			notes: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			coins: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			start_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			end_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			paid: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			sequelize,
			tableName: "sitting",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "animal_id",
					using: "BTREE",
					fields: [{ name: "animal_id" }],
				},
				{
					name: "owner_id",
					using: "BTREE",
					fields: [{ name: "owner_id" }],
				},
				{
					name: "city",
					using: "BTREE",
					fields: [{ name: "city" }],
				},
			],
		},
	);
};

module.exports = SittingModel;
