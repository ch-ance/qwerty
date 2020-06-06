"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create task" });
    }
});
router.get(`/find`, async (req, res) => {
    const { email } = req.body;
    try {
        const tasks = await PeriodicTasks.findByUser(email);
        res.status(200).json({ tasks });
    }
    catch (error) {
        console.error(error);
        res
            .status(404)
            .json({ error: "Unable to find tasks associated with user" });
    }
});
module.exports = router;
//# sourceMappingURL=periodTaskRouter.js.map