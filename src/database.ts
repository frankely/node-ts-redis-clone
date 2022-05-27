type Transaction = {
  commands: string[];
  dataset: Map<string, string>;
};

const SUCCESSFUL_TRANSACTION_OPERATION_CODE = 1;
export const NO_TRANSACTIONS_CODE = 0;

export class Database {
  database: Map<string, string> = new Map<string, string>();
  transactions: Transaction[] = [];

  public set(name: string, value: string) {
    if (this.transactions.length === 0) {
      this.database.set(name, value);
    } else {
      const currentTransaction =
        this.transactions[this.transactions.length - 1];
      currentTransaction.dataset.set(name, value);
    }
  }
  public get(name: string) {
    if (this.transactions.length === 0) {
      return this.database.get(name);
    } else {
      for (let i = this.transactions.length - 1; i >= 0; i--) {
        const transaction = this.transactions[i];
        const value = transaction.dataset.get(name);

        if (value) {
          return value;
        }
      }
      return this.database.get(name);
    }
  }
  public unset(name: string) {
    this.database.delete(name);
  }

  public commitTransaction() {
    if (this.transactions.length === 0) {
      return NO_TRANSACTIONS_CODE;
    }

    const currentTransaction = this.transactions.pop();

    currentTransaction?.dataset.forEach((value, key) => {
      this.database.set(key, value);
    });

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
    const transaction = {
      commands: [],
      dataset: new Map<string, string>(this.database),
    };
    this.transactions.push(transaction);
  }

  public countValueOccurrences(value: string) {
    return [...this.database.values()].filter((v) => v === value).length;
  }
}
