require("dotenv").config();

const knex = require("knex");
const config = require("../../knexfile.ts");

const dbEnvironment = process.env.DB_ENV || "development";

module.exports = knex(config[dbEnvironment]);