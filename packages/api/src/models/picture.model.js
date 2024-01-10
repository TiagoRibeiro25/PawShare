const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const PictureModel = (sequelize) => {
	return sequelize.define(
		"picture",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			animal_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			provider_id: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			provider_url: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "picture",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "user_id",
					using: "BTREE",
					fields: [{ name: "user_id" }],
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

module.exports = PictureModel;
