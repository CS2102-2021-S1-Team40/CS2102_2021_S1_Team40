const pool = require("../pools");

class BaseDaily {
  constructor() {
    this.pool = pool;
    this.table = "base_dailys";
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async get() {
    let query = `SELECT * FROM ${this.table};`;
    const results = await this.pool.query(query);
    return results.rows;
  }

  async getBaseDaily(ftct_username) {
    let query = `SELECT * FROM ${this.table} a
        WHERE a.ftct_username = '${ftct_username}';`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async addBaseDaily(ftct_username, pet_type, base_price) {
    let query = `INSERT INTO ${this.table}
                        VALUES ('${ftct_username}', '${pet_type}', '${base_price}')
                        RETURNING ftct_username;`;
    const results = await this.pool.query(query);
    if (results.rows.length !== 1) {
      return null;
    } else {
      return {
        ftct_username: ftct_username,
        base_price: base_price,
        pet_type: pet_type,
      };
    }
  }
}

module.exports = new BaseDaily();
