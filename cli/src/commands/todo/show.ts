import { Command, flags } from "@oclif/command";
import { getListNames } from "../../helpers/todo";

export default class TodoShow extends Command {
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
    const { args, flags } = this.parse(TodoShow);

    // get all available lists
    await getListNames()
      .then(lists => {
        if (lists.length === 0) console.log("No lists available");
        else {
          lists.map((list, index) => {
            console.log(`${index + 1}. ${list}`);
          });
        }
      })
      .catch(console.error);
  }
}
