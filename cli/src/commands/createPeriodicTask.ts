import { Command, flags } from "@oclif/command";
import { prompt, Select, NumberPrompt } from "enquirer";
import { PeriodicTask, PeriodUnit } from "../interfaces";
import Axios from "axios";
import { getState } from "../helpers/state";
require("dotenv").config();

export default class CreatePeriodicTask extends Command {
  static description = "describe the command here";

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with no value (-f, --force)
    name: flags.string({ char: "n" }),
    frequency: flags.integer({ char: "i" }),
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];

  async run() {
    // TODO: error handling if no name found (maybe change the helper function to handle errors more gracefully?)
    const name = getState("name");
    const { args, flags } = this.parse(CreatePeriodicTask);

    const newTask: PeriodicTask = {
      task_name: flags.name || "",
      period_unit: PeriodUnit.days,
      period_frequency: flags.frequency || 1
    };

    const unitPrompt = new Select({
      name: "period_unit",
      message: "Pick a unit of time for this to reoccur",
      choices: ["seconds", "minutes", "hours", "days"]
    });
    const frequencyPrompt = new NumberPrompt({
      name: "period_frequency",
      message: "How often should this occur? (Enter a number)"
    });
    try {
      if (!flags.name) {
        await prompt([
          {
            type: "input",
            name: "task_name",
            message: "Task Name: "
          }
        ]).then((answer: any) => {
          newTask.task_name = answer.task_name;
        });
      }

      // unit cannot be passed in as flags currently; I need to look at flags.choice before going with an integer or string implementation
      newTask.period_unit = await unitPrompt.run();
      if (!flags.frequency) {
        newTask.period_frequency = await frequencyPrompt.run();
      }
      this.log(
        `Creating new task: ${newTask.task_name} to repeat every ${newTask.period_frequency} ${newTask.period_unit}`
      );

      const res = await Axios.post(
        `${process.env.API_URL}/api/periodic_tasks/create`,
        { newTask, user: { email: name } }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
      this.log("There was an error creating the task :/");
    }

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}
