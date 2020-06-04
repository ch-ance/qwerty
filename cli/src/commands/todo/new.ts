// todo:new - prompts the user to create a new todo.
import { Command, flags } from "@oclif/command";
import { Select, Input } from "enquirer";
import emoji = require("node-emoji");
import { v4 as uuid4 } from "uuid";
import { createTodo, getListNames, createTodoList } from "../../helpers/todo";
import { Todo } from "../../interfaces";
export default class TodoNew extends Command {
  static description = "describe the command here";

  static flags = {
    help: flags.help({ char: "h" }),
    // used to specify a list to use for the new todo
    list: flags.string({ char: "l" }),
    // used to specify the name of the task
    task: flags.string({ char: "t" })
  };

  static args = [{ name: "file" }];

  async run() {
    const { args, flags } = this.parse(TodoNew);

    // Create a new todo; if the values are given in flags, use them. Otherwise set to null and prompt.
    const newTodo = {
      list: flags.list ?? null,
      task: flags.task ?? null,
      uuid: uuid4()
    };

    try {
      // if no list value was given in flags, prompt by displaying current lists or offering to create a new list
      const currentTodoLists = await getListNames();
      const choices = [];
      currentTodoLists.forEach((list, index) => {
        choices.push({ value: index, message: list });
      });
      choices.push({ name: "", message: "Create a new list!" });
      if (!newTodo.list) {
        const listPrompt = new Select({
          name: "list",
          message: "Choose a list to add to",
          choices
        });
        const listAnswer = await listPrompt.run();
        // if answer is not in current lists
        if (currentTodoLists.indexOf(listAnswer) < 0) {
          // if the answer given is not in the current lists, prompt the user to create a new todo list
          this.createNewList()
            .then(newList => {
              newTodo.list = newList;
              this.getNewTaskFromUser()
                .then(task => {
                  newTodo.task = task;
                })
                .catch(console.error);
            })
            .catch(console.error);
        } else {
          newTodo.list = listAnswer;
          // if no task value was given in flags, prompt by asking for a task name
          if (!newTodo.task) {
            this.getNewTaskFromUser().then(task => {
              newTodo.task = task;
              this.addTodoToDatabase(newTodo);
            });
          } else {
            this.addTodoToDatabase(newTodo);
          }
        }

        // now that we have all the uuid, task, and list, let's create a newTodo
      }
    } catch (error) {
      console.error(error);
    }
  }
  async getNewTaskFromUser(): Promise<string | void> {
    const taskPrompt = new Input({
      message: "Task name: "
    });

    await taskPrompt
      .run()
      .then((answer: string) => {
        return answer;
      })
      .catch(console.error);
  }
  async addTodoToDatabase(newTodo: Todo) {
    createTodo(newTodo)
      .then((addedTodo: Todo) => {
        console.log(
          `Successfully added ${addedTodo.task} to the list: ${addedTodo.list}`
        );
      })
      .catch(console.error);
  }

  async createNewList() {
    const listPrompt = new Input({
      message: "Name of new todo list: "
    });

    const answer = await listPrompt.run();
    createTodoList(answer)
      .then((list: string) => {
        console.log(`${list} successfully created ${emoji.get("tada")}`);
      })
      .catch(console.error);
  }
}
