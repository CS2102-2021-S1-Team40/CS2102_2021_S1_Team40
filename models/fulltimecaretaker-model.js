const pool = require("../pools");

class FullTimeCareTaker {
  constructor() {
    this.pool = pool;
    this.table = "fulltime_caretakers";
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async get() {
    let query = `SELECT username FROM ${this.table};`;
    const results = await this.pool.query(query);
    return results.rows;
  }

  async getSingleFTCareTaker(username) {
    let query = `SELECT c.username FROM ${this.table} c
        WHERE c.username = '${username}';`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return {
        username: username,
      };
    }
  }

  async addNewFTCareTaker(username) {
    let query = `INSERT INTO ${this.table}
                        VALUES ('${username}')
                        RETURNING username;`;
    const results = await this.pool.query(query);
    if (results.rows.length !== 1) {
      return null;
    } else {
      return {
        username: username,
        type: ["fulltime"],
      };
    }
  }
}

module.exports = new FullTimeCareTaker();
