"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const knex = require("knex");
const config = require("../../knexfile.ts");
const dbEnvironment = process.env.DB_ENV || "development";
exports.default = knex(config[dbEnvironment]);
//# sourceMappingURL=dbConfig.js.map