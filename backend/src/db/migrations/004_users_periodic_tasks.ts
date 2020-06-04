import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
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

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("users_periodic_tasks");
}
