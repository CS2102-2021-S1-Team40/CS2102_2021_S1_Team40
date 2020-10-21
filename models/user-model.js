const pool = require("../pools");

class User {
  constructor() {
    this.pool = pool; //default to petowners
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async get() {
    let query = `SELECT username FROM admins
    UNION
    SELECT username FROM caretakers
    UNION
    SELECT username FROM petowners;`;
    const results = await this.pool.query(query);
    return results.rows;
  }

  async getSingleUser(username, password) {
    let query = `SELECT t.username, t.type FROM (
      SELECT username, password, 'admin' AS type FROM admins
      UNION
      SELECT username, password, 'caretaker' AS type FROM caretakers
      UNION
      SELECT username, password, 'petowner' AS type FROM petowners
  ) AS t WHERE t.username = '${username}' AND password = '${password}'`;
    const result = await this.pool.query(query);
    console.log(result);
    if (result.rows.length === 0) {
      return null;
    } else {
      return {
        username: username,
        type: result.rows.map((r) => r.type),
      };
    }
  }
}

module.exports = new User();
