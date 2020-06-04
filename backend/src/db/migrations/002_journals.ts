import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
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

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("journals");
}
