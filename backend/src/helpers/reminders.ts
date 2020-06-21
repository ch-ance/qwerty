// import * as knex from 'knex';
import db from "../db/dbConfig";
import { Reminder } from "../types/index";

// interface ReminderInput {
//     task: string;

// }

function isValidReminderInput(input: string) {
  return true;
}

function getMeridiem(input: string) {
  return false;
}
const validTimeUnits = ["second", "minute", "hour", "day"];
function getMilliseconds(unitOfTime: string) {
  switch (unitOfTime) {
    case "second":
      return 1000;
    case "minute":
      return 60000;
    case "hour":
      return 3600000;
    case "day":
      return 86400000;
    default:
      throw new Error("How did we get here?");
  }
}
function getTimeToRemind(input: string) {
  let timeUnit: string | boolean = false;
  for (const unit of validTimeUnits) {
    if (input.includes(unit)) {
      timeUnit = unit;
    }
  }
  // if a time unit was found, treat the expression as similar to "in 3 minutes"
  if (timeUnit) {
    const units = parseInt(input, 10);
    const currentDate = Date.now();
    return currentDate + units * getMilliseconds(timeUnit);
  } else if (getMeridiem) {
    console.log("meridiem found!");
  } else {
    throw new Error("invalid input");
  }
}

async function add(userInput: string) {
  // tslint:disable-next-line: no-trailing-whitespace
  if (!isValidReminderInput(userInput)) {
    throw new Error("invalid input format");
  }
  const timeToRemind = getTimeToRemind(userInput);
}

// async function find(): Promise<PeriodicTask[]> {
//   try {
//     const periodicTasks = await db("periodic_tasks").select("task_name");
//     return periodicTasks;
//   } catch (error) {
//     console.error(error);
//     return undefined;
//   }
// }

// function findById(id: number): Promise<PeriodicTask> {
//   return db("periodic_tasks")
//     .select("*")
//     .where({ id })
//     .first();
// }

// async function findByUser(email: string): Promise<PeriodicTask[]> {
//   try {
//     const user_id = await db("users")
//       .select("id")
//       .where({ email })
//       .first();

//     const taskIDs = await db("users_periodic_tasks")
//       .select("task_id")
//       .where({ user_id: user_id.id });

//     const tasks: PeriodicTask[] = await db("periodic_tasks")
//       .select("*")
//       .whereIn("id", taskIDs);

//     return tasks;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function add(periodicTask: Promise<PeriodicTask>, email: string) {
//   try {
//     // insert the task
//     const [newTaskID] = await db("periodic_tasks")
//       .insert(periodicTask)
//       .returning("id");

//     // find the user ID from the email
//     const user = await db("users")
//       .where({ email })
//       .returning("*")
//       .first();

//     // insert row into relational table
//     await db("users_periodic_tasks").insert({
//       user_id: user.id,
//       task_id: newTaskID
//     });
//   } catch (error) {
//     console.log(
//       `There was an error adding PeriodicTask ${periodicTask} ${error}`
//     );
//     // return undefined;
//   }
// }
