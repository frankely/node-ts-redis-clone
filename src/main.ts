// process.stdin.on("data", (data) => {
//   console.log(`You typed ${data.toString()}`);
// });
import * as readline from "readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });
const database = new Map<string, string>();

function displayMessage(message: string) {
  process.stdout.write(message);
  process.stdout.write("\n");
}

function set(name: string, value: string) {
  database.set(name, value);
}

function get(name: string) {
  return database.get(name);
}
function unset(name: string) {
  database.delete(name);
}

function countValueOccurrences(value: string) {
  return [...database.values()].filter((v) => v === value).length;
}
function parseCommand(command: string) {
  const [cmd, ...args] = command.split(" ");

  switch (cmd) {
    case "SET": {
      const name = args[0];
      const value = args[1];
      set(name, value);
      break;
    }
    case "GET": {
      const name = args[0];
      const value = get(name);

      displayMessage(value || "NULL");
      break;
    }
    case "UNSET": {
      const name = args[0];
      unset(name);
      break;
    }
    case "NUMEQUALTO": {
      const value = args[0];
      const count = countValueOccurrences(value);
      displayMessage(count.toString());
      break;
    }
    default: {
      displayMessage("Invalid Command")
    }
  }
}

function requestCommand() {
  rl.prompt();
  rl.on("line", (command) => {
    if (command.includes("END")) {
      rl.close();
      return;
    } else {
      parseCommand(command);
      requestCommand();
    }
    rl.prompt();
  });
}

requestCommand();
