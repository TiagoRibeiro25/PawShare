const { Sequelize } = require("sequelize");
const config = require("../config");
const models = require("../models");

const sequelize = new Sequelize(
	config.db.mysql.database,
	config.db.mysql.username,
	config.db.mysql.password,
	{
		host: config.db.mysql.mysql.host,
		dialect: config.db.mysql.mysql.dialect,
		pool: {
			max: config.db.mysql.mysql.pool.max,
			min: config.db.mysql.mysql.pool.min,
			acquire: config.db.mysql.mysql.pool.acquire,
			idle: config.db.mysql.mysql.pool.idle,
		},
		logging: config.db.mysql.mysql.logging,
	},
);

const mysql = { sequelize, ...models.init(sequelize) };

// Sync all the models (create the tables and add the foreign keys)
mysql.sequelize.sync({ alter: true });

// HARD RESET (DROP ALL TABLES)
// mysql.sequelize.sync({ force: true });

module.exports = mysql;
