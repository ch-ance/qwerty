"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("journals", t => {
        t.increments();
        t.integer("user_id").unsigned();
        t.foreign("user_id")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE") // if User primary key is changed, update this foreign key.
            .onDelete("CASCADE"); // if User with this ID is deleted, delete this journal.
        t.string("title", 64);
        t.text("body");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTableIfExists("journals");
}
exports.down = down;
//# sourceMappingURL=002_journals.js.map