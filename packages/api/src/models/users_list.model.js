const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const UsersListModel = (sequelize) => {
	return sequelize.define(
		"users_list",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			adoption_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			sitting_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			is_confirmed: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "users_list",
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
					name: "is_confirmed",
					using: "BTREE",
					fields: [{ name: "is_confirmed" }],
				},
			],
		},
	);
};

module.exports = UsersListModel;
