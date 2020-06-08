import { Command, flags } from "@oclif/command";
import { PeriodicTask } from "../interfaces";
import Axios from "axios";
import { getState } from "../helpers/state";
require("dotenv").config();

export default class CreatePeriodicTask extends Command {
  static description = "describe the command here";

  static flags = {
    help: flags.help({ char: "h" }),
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];

  async run() {
    // TODO: error handling if no name found (maybe change the helper function to handle errors more gracefully?)
    const email = getState("name");
    const { args, flags } = this.parse(CreatePeriodicTask);

    let tasks: PeriodicTask[] = [];
    try {
      tasks = await Axios.get(
        `${process.env.API_URL}/api/periodic_tasks/get/${email}`
      );
    } catch (error) {
      console.error(error);
    }
  }
}
