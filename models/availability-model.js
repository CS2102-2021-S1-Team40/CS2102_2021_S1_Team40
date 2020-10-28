const pool = require("../pools");

class Availability {
  constructor() {
    this.pool = pool;
    this.table = "availabilities";
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

  async getAvailability(username) {
    let query = `SELECT * FROM ${this.table} a
        WHERE a.username = '${username}';`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async addAvailability(
    username,
    pet_type,
    advertised_price,
    start_date,
    end_date
  ) {
    let query = `INSERT INTO ${this.table}
                        VALUES ('${username}', '${pet_type}', '${advertised_price}', '${start_date}', '${end_date}')
                        RETURNING username;`;
    const results = await this.pool.query(query);
    if (results.rows.length !== 1) {
      return null;
    } else {
      return {
        username: username,
        pet_type: pet_type,
        advertised_price: advertised_price,
        start_date: start_date,
        end_date: end_date,
      };
    }
  }
}

module.exports = new Availability();
