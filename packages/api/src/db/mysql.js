const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");
const models = require("../models");

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
	logging: dbConfig.logging,
});

const mysql = { sequelize, ...models.init(sequelize) };

// Sync all the models (create the tables and add the foreign keys)
mysql.sequelize.sync({ alter: true });

// HARD RESET (DROP ALL TABLES)
// mysql.sequelize.sync({ force: true });

module.exports = mysql;
