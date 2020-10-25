const pool = require("../pools");

class PartTimeCareTaker {
  constructor() {
    this.pool = pool;
    this.table = "parttime_caretakers";
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

  async getSinglePTCareTaker(username) {
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

  async addNewPTCareTaker(username) {
    let query = `INSERT INTO ${this.table}
                        VALUES ('${username}')
                        RETURNING username;`;
    const results = await this.pool.query(query);
    if (results.rows.length !== 1) {
      return null;
    } else {
      return {
        username: username,
        type: ["parttime"],
      };
    }
  }
}

module.exports = new PartTimeCareTaker();
