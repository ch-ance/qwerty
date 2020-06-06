"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("periodic_tasks", t => {
        t.increments();
        t.dateTime("created_at").notNullable();
        t.dateTime("updated_at").nullable();
        t.string("task_name", 255).notNullable();
        t.text("task_description").nullable();
        t.enum("period_unit", ["seconds", "minutes", "hours", "days"])
            .notNullable()
            .defaultTo("days");
        t.integer("period_frequency")
            .notNullable()
            .defaultTo(1);
        t.text("notes").nullable();
        t.boolean("completed")
            .notNullable()
            .defaultTo(false);
        t.dateTime("last_completed_at");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTableIfExists("periodic_tasks");
}
exports.down = down;
//# sourceMappingURL=003_periodic_tasks.js.map