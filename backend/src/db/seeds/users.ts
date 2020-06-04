import * as Knex from "knex";
import * as bcrypt from "bcryptjs";
require("dotenv").config();

const password = bcrypt.hashSync("password");
// ugh
const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("users").insert([
        { createdAt, email: "chance@mail.com", password }
      ]);
    });
}
