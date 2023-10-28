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
				allowNull: true,
			},
			phone_contact: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			notes: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			city: {
				type: DataTypes.STRING(255),
				allowNull: true,
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
			],
		},
	);
};

module.exports = AdoptionModel;
