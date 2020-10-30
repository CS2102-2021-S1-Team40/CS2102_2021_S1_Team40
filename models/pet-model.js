const pool = require("../pools");

class Pet {
  constructor() {
    this.pool = pool;
    this.table = "pets";
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async get() {
    let query = `SELECT * FROM ${this.table}`;
    const results = await this.pool.query(query);
    return results.rows;
  }

  async getPet(username) {
    let query = `SELECT p.username FROM ${this.table} p
        WHERE p.petowner_username == username;`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return {
        username: username,
      };
    }
  }

  async addNewPet(username, password, role) {
    let query = `INSERT INTO ${this.table}
                        VALUES ('${username}', '${password}')
                        RETURNING username;`;
    const results = await this.pool.query(query);
    if (results.rows.length !== 1) {
      return null;
    } else {
      return {
        username: username,
        type: role,
      };
    }
  }

}

module.exports = new Pet();
