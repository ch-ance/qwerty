// import * as knex from 'knex';
import db from "../db/dbConfig";
import { User } from "../types";

module.exports = {
  find,
  findById,
  findByEmail,
  add
};

async function find(): Promise<User[]> {
  try {
    const users = await db("users").select("email");
    return users;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

function findById(id: number): Promise<User> {
  return db("users")
    .select("*")
    .where({ id })
    .first();
}

function findByEmail(email: string): Promise<User> {
  return db("users")
    .select("*")
    .where({ email })
    .first();
}

async function add(user: User) {
  try {
    return await db("users")
      .insert(user)
      .returning("*");
  } catch (error) {
    console.log(`There was an error adding user ${user} ${error}`);
    return undefined;
  }
}
