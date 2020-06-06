import * as express from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { PeriodicTask } from "../types";

const PeriodicTasks = require("../helpers/periodic_tasks");

const router = express.Router();

// `Create` endpoint

router.post("/create", async (req, res) => {
  // pull required fields
  const { task_name, period_unit, period_frequency } = req.body.newTask;

  // get user email from body for now
  const { email } = req.body.user;

  // check for optional fields
  // tslint:disable-next-line: variable-name
  const task_description = req.body.newTask.task_description
    ? req.body.newTask.task_description
    : null;
  const notes = req.body.newTask.notes ? req.body.newTask.notes : null;

  // get timestamp
  const created_at = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const taskToCreate = {
    created_at,
    task_name,
    period_unit,
    period_frequency,
    task_description,
    notes
  };

  try {
    PeriodicTasks.add(taskToCreate, email)
      .then(newTask => {
        res.status(201).json({
          newTask,
          message: "API says hello! Task successfully created!"
        });
      })
      .catch(() => {
        res.status(403).json({ error: "Error creating task" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create task" });
  }
});

router.get(`/find`, async (req, res) => {
  const { email } = req.body;
  try {
    const tasks = await PeriodicTasks.findByUser(email);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .json({ error: "Unable to find tasks associated with user" });
  }
});

module.exports = router;
