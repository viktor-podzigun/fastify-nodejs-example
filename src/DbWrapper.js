import { DatabaseSync } from "node:sqlite";

class DbWrapper extends DatabaseSync {
  /**
   * @param {string} name
   */
  constructor(name) {
    super(name);

    //check if node:sqlite supports it
    //see: https://github.com/nodejs/node/issues/57431
    //@ts-ignore
    this.transaction = super.transaction ? super.transaction : this.transaction;
  }

  //see: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#transactionfunction---function
  /** @type {(f: (...args: any[]) => any) => (...args: any[]) => any} */
  transaction(f) {
    const self = this;

    /** @type {(args: any[]) => any} */
    const doTx = (...args) => {
      try {
        const res = f(...args);
        self.prepare("COMMIT").run();
        return res;
      } catch (error) {
        self.prepare("ROLLBACK").run();
        throw error;
      }
    };

    /** @type {(args: any[]) => any} */
    const txFn = (...args) => {
      self.prepare("BEGIN").run();
      return doTx(...args);
    };

    return txFn;
  }
}

export default DbWrapper;
