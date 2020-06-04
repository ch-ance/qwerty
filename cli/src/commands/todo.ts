import { Command, flags } from "@oclif/command";
import { Select } from "enquirer";
import { isEmpty } from "../utilities";
import TodoNew from "./todo/new";
import TodoShow from "./todo/show";

export default class Todo extends Command {
  static description = "describe the command here";

  static flags = {
    help: flags.help({ char: "h" }),
    // new todo
    new: flags.boolean({ char: "n" })
  };

  static args = [{ name: "file" }];

  async run() {
    const { args, flags } = this.parse(Todo);
    if (isEmpty(flags)) {
      // if there are no flags given, prompt for todo options
      const prompt = new Select({
        name: "todoAction",
        message: "What would you like to do?",
        choices: ["Create a new todo item", "View my todo list"]
      });

      prompt
        .run()
        .then((answer: string) => {
          console.log(answer);
          switch (answer) {
            case "Create a new todo item":
              TodoNew.run();
              break;
            case "View my todo list":
              TodoShow.run();
              break;
            default:
              break;
          }
        })
        .catch(console.error);
    }
  }
}
