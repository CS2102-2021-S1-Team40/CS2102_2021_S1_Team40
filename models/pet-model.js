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

  async getPetName(petowner_username, pet_type) {
    let query = `SELECT pet_name FROM ${this.table} WHERE petowner_username = '${petowner_username}' AND pet_type = '${pet_type}'`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return results.rows[0]["pet_name"];
    }
  }
}

module.exports = new Pet();
