"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("users_periodic_tasks", t => {
        t.increments();
        t.integer("user_id").unsigned();
        t.foreign("user_id")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE") // if User primary key is changed, update this foreign key.
            .onDelete("CASCADE"); // if User with this ID is deleted, delete this.
        t.integer("task_id").unsigned();
        t.foreign("task_id")
            .references("id")
            .inTable("periodic_tasks")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTableIfExists("users_periodic_tasks");
}
exports.down = down;
//# sourceMappingURL=004_users_periodic_tasks.js.map