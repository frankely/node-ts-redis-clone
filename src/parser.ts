import { Database, NO_TRANSACTIONS_CODE } from "./database";

const db = new Database();

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
    case "BEGIN": {
      db.beginTransaction();
      return EmptyParseResult;
    }
    case "ROLLBACK": {
      const result = db.rollbackTransaction();

      if (result === NO_TRANSACTIONS_CODE) {
        return {
          message: "NO TRANSACTION",
          shouldDisplayMessage: true,
        };
      }

      return EmptyParseResult;
    }
    case "COMMIT": {
      const result = db.commitTransaction();
      if (result === NO_TRANSACTIONS_CODE) {
        return {
          message: "NO TRANSACTION",
          shouldDisplayMessage: true,
        };
      }
      return EmptyParseResult;
    }
    case "SET": {
      const name = args[0];
      const value = args[1];
      db.set(name, value);

      return EmptyParseResult;
    }
    case "GET": {
      const name = args[0];
      const value = db.get(name);

      return {
        message: value || "NULL",
        shouldDisplayMessage: true,
      };
    }
    case "UNSET": {
      const name = args[0];
      db.unset(name);
      return EmptyParseResult;
    }
    case "NUMEQUALTO": {
      const value = args[0];
      const count = db.countValueOccurrences(value);
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
}
