"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as knex from 'knex';
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
module.exports = {
    find,
    findById,
    findByEmail,
    add
};
async function find() {
    try {
        const users = await dbConfig_1.default("users").select("email");
        return users;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}
function findById(id) {
    return dbConfig_1.default("users")
        .select("*")
        .where({ id })
        .first();
}
function findByEmail(email) {
    return dbConfig_1.default("users")
        .select("*")
        .where({ email })
        .first();
}
async function add(user) {
    try {
        return await dbConfig_1.default("users")
            .insert(user)
            .returning("*");
    }
    catch (error) {
        console.log(`There was an error adding user ${user} ${error}`);
        return undefined;
    }
}
//# sourceMappingURL=users.js.map