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
      return results.rows;
    }
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

  async addNewPet(petowner_username, pet_name, pet_type, special_requirements) {
    let query = `INSERT INTO ${this.table} (petowner_username, pet_name, pet_type, special_requirements)
                        VALUES ('${petowner_username}', '${pet_name}', '${pet_type}', '${special_requirements}')
                        RETURNING *`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows[0];
    }
  }

  async deletePet(petowner_username, pet_name) {
    console.log("At delete pets model");
    console.log(petowner_username);
    let query = `DELETE FROM ${this.table}
                  WHERE petowner_username = '${petowner_username}'
                  AND pet_name = '${pet_name}'
                  RETURNING petowner_username, pet_name`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows[0];
    }
  }
}

module.exports = new Pet();
