const { Sequelize, DataTypes } = require("sequelize");
const countries = require("../data/countries.json");

/**
 * @param {Sequelize} sequelize
 */
const UserModel = (sequelize) => {
	return sequelize.define(
		"user",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			display_name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			change_password_token: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			change_password_generated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			verify_user_token: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			is_verified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			type: {
				type: DataTypes.STRING(255),
				allowNull: false,
				defaultValue: "user",
				validate: {
					isIn: [["user", "organization"]],
				},
			},
			country: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: [countries],
				},
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			coins: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
				validate: {
					min: 0,
				},
			},
			badges: {
				type: DataTypes.STRING(255),
				allowNull: false,
				defaultValue: "[]",
			},
			frames: {
				type: DataTypes.STRING(255),
				allowNull: false,
				defaultValue: "[]",
			},
			selected_frame: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			banners: {
				type: DataTypes.STRING(255),
				allowNull: false,
				defaultValue: "[]",
			},
			selected_banner: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "user",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "email",
					unique: true,
					using: "BTREE",
					fields: [{ name: "email" }],
				},
				{
					name: "change_password_token",
					unique: true,
					using: "BTREE",
					fields: [{ name: "change_password_token" }],
				},
				{
					name: "verify_user_token",
					unique: true,
					using: "BTREE",
					fields: [{ name: "verify_user_token" }],
				},
				{
					name: "type",
					using: "BTREE",
					fields: [{ name: "type" }],
				},
			],
		},
	);
};

module.exports = UserModel;
