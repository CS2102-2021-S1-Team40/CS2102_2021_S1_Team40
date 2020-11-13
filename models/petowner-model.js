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

  async getCreditCard(username) {
    let query = `SELECT card_num FROM ${this.table}
        WHERE username = '${username}';`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return results.rows[0];
    }
  }

  async getSinglePetOwner(username, password) {
    let query = `SELECT username, card_num FROM ${this.table}
        WHERE username = '${username}';`;
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
                        RETURNING username`;
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

  async getProfileInfo(username) {
    let basic_query = `SELECT p.username, p.card_num, p.cardholder_name
                         FROM ${this.table} p
                         WHERE p.username = '${username}'`;

    let pet_query = `SELECT pet_name, pet_type, special_requirements
                       FROM pets
                       WHERE petowner_username = '${username}'`;

    let ongoing_query = `SELECT pet_name, caretaker_username, start_date, end_date, price, transfer_method
                        FROM bids
                        WHERE isSuccessful
                        AND petowner_username = '${username}'
                        AND end_date >= CURRENT_DATE
                        ORDER BY start_date DESC`;

    let past_query = `SELECT pet_name, caretaker_username, start_date, end_date, price, transfer_method, rating, review
                          FROM bids
                          WHERE isSuccessful
                          AND petowner_username = '${username}'
                          AND end_date < CURRENT_DATE
                          ORDER BY end_date DESC`;

    const basic_results = await this.pool.query(basic_query);
    const pet_results = await this.pool.query(pet_query);
    const ongoing_results = await this.pool.query(ongoing_query);
    const past_results = await this.pool.query(past_query);

    if (basic_results.rows.length === 0) {
      return null;
    } else {
      return {
        ...basic_results.rows[0],
        pets: pet_results.rows,
        ongoing: ongoing_results.rows,
        past: past_results.rows,
      };
    }
  }

  async updateCreditCard(
    username,
    card_num,
    card_expiry,
    card_cvv,
    cardholder_name
  ) {
    let query = `UPDATE ${this.table}
                        SET card_num = '${card_num}', card_expiry = '${card_expiry}', card_cvv = '${card_cvv}', cardholder_name = '${cardholder_name}'
                        WHERE username = '${username}'
                        RETURNING *`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return results.rows;
    }
  }
}

module.exports = new PetOwner();
