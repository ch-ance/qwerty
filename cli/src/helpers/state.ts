import { NewStateItem } from '../interfaces';

const fs = require('fs');

export function saveState(newItem: object): void {
    let currentState = {}
    try {
        currentState = JSON.parse(fs.readFileSync(".state.json"))
    } catch (error) {
        console.log("no current state file/unable to retrieve")
    }
    const newState = {...currentState, ...newItem}

    fs.writeFileSync(".state.json", JSON.stringify(newState));
}

export function getState(item: string = "") {
    let currentState: any = {}
    try {
        currentState = JSON.parse(fs.readFileSync(".state.json"))
    } catch (error) {
        console.log("no current state file/unable to retrieve")
    }

    if (item == "") {
        return currentState;
    } else {
        return currentState[item];
    }
}


