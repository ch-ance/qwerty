"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function find() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield dbConfig_1.default("users").select("email");
            return users;
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    });
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
function add(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield dbConfig_1.default("users")
                .insert(user)
                .returning("*");
        }
        catch (error) {
            console.log(`There was an error adding user ${user} ${error}`);
            return undefined;
        }
    });
}
//# sourceMappingURL=users.js.map