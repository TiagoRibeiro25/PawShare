const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const AnimalDocument = (sequelize) => {
	return sequelize.define(
		"animal_document",
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
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			document: {
				type: DataTypes.BLOB,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "animal_document",
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
			],
		},
	);
};

module.exports = AnimalDocument;
