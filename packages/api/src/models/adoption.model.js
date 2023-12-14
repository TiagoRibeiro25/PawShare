const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const AdoptionModel = (sequelize) => {
	return sequelize.define(
		"adoption",
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
			email_contact: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			phone_contact: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			notes: {
				type: DataTypes.STRING(255),
				allowNull: false,
				defaultValue: "[]",
			},
			city: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			is_closed: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			sequelize,
			tableName: "adoption",
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
				{
					name: "is_closed",
					using: "BTREE",
					fields: [{ name: "is_closed" }],
				},
			],
		},
	);
};

module.exports = AdoptionModel;
