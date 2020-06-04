import { Command, flags } from "@oclif/command";
import todosDB from "../../local_json_dbs/todosDatabase";

export default class DeleteEverything extends Command {
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
    const { args, flags } = this.parse(DeleteEverything);

    this.log(
      "This command will delete everything. You must use the --force flag if you wish to do this. You will lose all of your local data"
    );
    if (flags.force) {
      this.log("You're really doing it!");
      todosDB.setState({});
      console.log("Todos database has been cleared");
    }
  }
}
