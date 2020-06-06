"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as knex from 'knex';
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
module.exports = {
    add,
    find,
    findById,
    findByUser
};
async function find() {
    try {
        const periodicTasks = await dbConfig_1.default("periodic_tasks").select("task_name");
        return periodicTasks;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}
function findById(id) {
    return dbConfig_1.default("periodic_tasks")
        .select("*")
        .where({ id })
        .first();
}
async function findByUser(email) {
    try {
        const user_id = await dbConfig_1.default("users")
            .select("id")
            .where({ email })
            .first();
        const taskIDs = await dbConfig_1.default("users_periodic_tasks")
            .select("task_id")
            .where({ user_id: user_id.id });
        const tasks = await dbConfig_1.default("periodic_tasks")
            .select("*")
            .whereIn("id", taskIDs);
        return tasks;
    }
    catch (error) {
        console.error(error);
    }
}
async function add(periodicTask, email) {
    try {
        // insert the task
        const [newTaskID] = await dbConfig_1.default("periodic_tasks")
            .insert(periodicTask)
            .returning("id");
        // find the user ID from the email
        const user = await dbConfig_1.default("users")
            .where({ email })
            .returning("*")
            .first();
        // insert row into relational table
        await dbConfig_1.default("users_periodic_tasks").insert({
            user_id: user.id,
            task_id: newTaskID
        });
    }
    catch (error) {
        console.log(`There was an error adding PeriodicTask ${periodicTask} ${error}`);
        // return undefined;
    }
}
//# sourceMappingURL=periodic_tasks.js.map