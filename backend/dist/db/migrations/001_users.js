"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("users", t => {
        t.increments();
        t.dateTime("createdAt").notNullable();
        t.dateTime("updatedAt").nullable();
        t.string("email", 32).notNullable().unique();
        t.string("password", 128).notNullable();
        t.text('public_key');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTableIfExists("users");
}
exports.down = down;
//# sourceMappingURL=001_users.js.map