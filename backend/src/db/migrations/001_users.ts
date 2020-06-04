import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("users", t => {
    t.increments();
    t.dateTime("createdAt").notNullable();
    t.dateTime("updatedAt").nullable();

    t.string("email", 32).notNullable().unique();
    t.string("password", 128).notNullable();

    t.text('public_key');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("users");
}
