const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const ReviewModel = (sequelize) => {
	return sequelize.define(
		"review",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			adoption_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			sitting_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			type: {
				// only if it's a sitting review
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: [["sitter", "owner"]],
				},
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: { min: 1, max: 5 },
			},
			comment: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "review",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "adoption_id",
					using: "BTREE",
					fields: [{ name: "adoption_id" }],
				},
				{
					name: "sitting_id",
					using: "BTREE",
					fields: [{ name: "sitting_id" }],
				},
				{
					name: "type",
					using: "BTREE",
					fields: [{ name: "type" }],
				},
				{
					name: "rating",
					using: "BTREE",
					fields: [{ name: "rating" }],
				},
			],
		},
	);
};

module.exports = ReviewModel;
