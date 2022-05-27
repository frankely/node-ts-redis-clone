import { set, get, unset, countValueOccurrences } from "./database";

type ParseResult = {
  message: string;
  shouldDisplayMessage: boolean;
};

const EmptyParseResult = {
  message: "",
  shouldDisplayMessage: false,
};
export function parseCommand(command: string): ParseResult {
  const [cmd, ...args] = command.split(" ");

  switch (cmd) {
    case "SET": {
      const name = args[0];
      const value = args[1];
      set(name, value);

      return EmptyParseResult;
    }
    case "GET": {
      const name = args[0];
      const value = get(name);

      return {
        message: value || "NULL",
        shouldDisplayMessage: true,
      };
    }
    case "UNSET": {
      const name = args[0];
      unset(name);
      return EmptyParseResult;
    }
    case "NUMEQUALTO": {
      const value = args[0];
      const count = countValueOccurrences(value);
      return {
        message: count.toString(),
        shouldDisplayMessage: true,
      };
    }
    default: {
      return {
        message: `Unknown command: ${cmd}`,
        shouldDisplayMessage: true,
      };
    }
  }

  return EmptyParseResult;
}
