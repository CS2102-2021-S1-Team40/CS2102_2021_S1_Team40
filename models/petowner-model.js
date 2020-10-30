const pool = require("../pools");

class PetOwner {
  constructor() {
    this.pool = pool;
    this.table = "petowners";
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

  async getSinglePetOwner(username, password) {
    let query = `SELECT p.username, p.card_num FROM ${this.table} p
        WHERE p.username = username;`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return {
        username: username,
        card_num: card_num,
      };
    }
  }

  async addNewPetOwner(username, password, role) {
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

  async addNewCreditCard(username, card_num, card_expiry, card_cvv, cardholder_name) {
    let query = `UPDATE ${this.table}
                        SET card_num = '${card_num}', card_expiry = '${card_expiry}', card_cvv = '${card_cvv}', cardholder_name = '${cardholder_name}'
                        WHERE username = '${username}'
                        RETURNING username, card_num;`;
    const results = await this.pool.query(query);
    console.log("here model--------------------------");
    if (results.rows.length === 0) {
      return null;
    } else {
      return {
        username: username,
        card_num: card_num,
      };
    }
  }
}

module.exports = new PetOwner();
