// import * as knex from 'knex';
import db from "../db/dbConfig";
import { PeriodicTask } from "../types/index";

module.exports = {
  add,
  find,
  findById,
  findByUser
};

async function find(): Promise<PeriodicTask[]> {
  try {
    const periodicTasks = await db("periodic_tasks").select("task_name");
    return periodicTasks;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

function findById(id: number): Promise<PeriodicTask> {
  return db("periodic_tasks")
    .select("*")
    .where({ id })
    .first();
}

async function findByUser(email: string): Promise<PeriodicTask[]> {
  try {
    const user_id = await db("users")
      .select("id")
      .where({ email })
      .first();

    const taskIDs = await db("users_periodic_tasks")
      .select("task_id")
      .where({ user_id: user_id.id });

    const tasks: PeriodicTask[] = await db("periodic_tasks")
      .select("*")
      .whereIn("id", taskIDs);

    return tasks;
  } catch (error) {
    console.error(error);
  }
}

async function add(periodicTask: Promise<PeriodicTask>, email: string) {
  try {
    // insert the task
    const [newTaskID] = await db("periodic_tasks")
      .insert(periodicTask)
      .returning("id");

    // find the user ID from the email
    const user = await db("users")
      .where({ email })
      .returning("*")
      .first();

    // insert row into relational table
    await db("users_periodic_tasks").insert({
      user_id: user.id,
      task_id: newTaskID
    });
  } catch (error) {
    console.log(
      `There was an error adding PeriodicTask ${periodicTask} ${error}`
    );
    // return undefined;
  }
}
