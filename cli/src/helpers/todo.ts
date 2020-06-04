// Helper functions for the todo commands.
import { Todo } from "../interfaces";
import todosDB from "../local_json_dbs/todosDatabase";

export function createTodo(todo: Todo): Promise<Todo> {
  return new Promise(function(resolve, reject) {
    try {
      const currentState = todosDB.getState();

      const updatedTodoList = [...currentState[todo.list], todo];
      const newState = { ...currentState, [todo.list]: updatedTodoList };
      todosDB.setState(newState);

      // resolve the promise and return the recently added todo (the last element)
      resolve(todosDB.getState()[todo.list][updatedTodoList.length - 1]);
    } catch (error) {
      // show the trace-back for the error, this should probably only happen in development or logged to a server for analytics if we wanna get really crazy
      console.trace();
      reject(`Error creating new todo ${error}`);
    }
  });
}

export function getTodoList(list: string) {
  return new Promise(function(resolve, reject) {
    try {
      const todos = todosDB.getState().todos;
      resolve(todos);
    } catch (error) {
      reject(`Error getting todo list ${error}`);
    }
  });
}

export function getListNames(): Promise<string[]> {
  return new Promise(function(resolve, reject) {
    try {
      const state = todosDB.getState();
      const names: string[] = [];
      state.lists.forEach((list: string) => {
        names.push(list);
      });
      resolve(names);
    } catch (error) {
      reject(`Error getting list names ${error}`);
    }
  });
}

export function createTodoList(listName: string): Promise<string> {
  return new Promise(function(resolve, reject) {
    try {
      const state = todosDB.getState();
      const newState = { ...state, [listName]: [] };
      todosDB.setState(newState);
      resolve(todosDB.getState().lists.listName);
    } catch (error) {
      reject(`Error creating new list ${error}`);
    }
  });
}
