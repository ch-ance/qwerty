import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("reminders", t => {
    t.increments();

    t.integer("user_id").unsigned();
    t.foreign("user_id")
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE") // if User primary key is changed, update this foreign key.
      .onDelete("CASCADE"); // if User with this ID is deleted, delete this.

    t.string("task", 122).notNullable();

    t.dateTime("created_at").notNullable();
    t.dateTime("updated_at");

    t.dateTime("remind_at").notNullable();

    t.boolean("completed").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("reminders");
}
