import * as readline from "readline";
import { stdin as input, stdout as output } from "node:process";
import { parseCommand } from "./parser";

function displayMessage(message: string) {
  console.log(message);
}

const rl = readline.createInterface({ input, output });

rl.on("line", (line: string) => {
  if (line === "END") {
    rl.close();
  } else {
    const result = parseCommand(line);

    if (result.shouldDisplayMessage) {
      displayMessage(result.message);
    }
  }
});
