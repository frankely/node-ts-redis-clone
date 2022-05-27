type Transaction = {
  commands: string[];
};

const SUCCESSFUL_TRANSACTION_OPERATION_CODE = 1;
export const NO_TRANSACTIONS_CODE = 0;

export class Database {
  database: Map<string, string> = new Map<string, string>();
  transactions: Transaction[] = [];

  public set(name: string, value: string) {
    this.database.set(name, value);
  }
  public get(name: string) {
    return this.database.get(name);
  }
  public unset(name: string) {
    this.database.delete(name);
  }

  public commitTransaction() {
    if (this.transactions.length === 0) {
      return NO_TRANSACTIONS_CODE;
    }
    this.transactions.pop();

    return SUCCESSFUL_TRANSACTION_OPERATION_CODE;
  }
  public rollbackTransaction(): number {
    if (this.transactions.length === 0) {
      return NO_TRANSACTIONS_CODE;
    }
    this.transactions.pop();

    return SUCCESSFUL_TRANSACTION_OPERATION_CODE;
  }
  public beginTransaction() {
    throw new Error("Method not implemented.");
  }

  public countValueOccurrences(value: string) {
    return [...this.database.values()].filter((v) => v === value).length;
  }
}
