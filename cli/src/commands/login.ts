import { Command, flags } from "@oclif/command";
import { saveState } from "../helpers/state";
import { prompt } from "enquirer";
import Axios from "axios";
require("dotenv").config();

export default class Login extends Command {
  static description = "describe the command here";

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];

  async run() {
    const { args, flags } = this.parse(Login);
    const user = await prompt([
      {
        type: "input",
        name: "email",
        message: "Email address: "
      },
      {
        type: "password",
        name: "password",
        message: "Password: "
      }
    ]);

    Axios.post(`${process.env.API_URL}/api/users/login`, { user })
      .then(res => {
        const token = res.data.token;
        const name = res.data.name;
        saveState({ token });
        saveState({ name });
      })
      .catch(console.error);

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}
