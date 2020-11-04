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
    console.log("get info model");
    let basic_query = `SELECT p.username, p.card_num
                         FROM ${this.table} p
                         WHERE p.username = '${username}'`;

    let pet_query = `SELECT pet_name, pet_type, special_requirements
                       FROM pets
                       WHERE petowner_username = '${username}'`;

    let review_query = `SELECT pet_name, caretaker_username, start_date, end_date, rating, review
                          FROM bids
                          WHERE isSuccessful
                          AND petowner_username = '${username}'`;

    const basic_results = await this.pool.query(basic_query);
    const pet_results = await this.pool.query(pet_query);
    const review_results = await this.pool.query(review_query);

    if (basic_results.rows.length === 0) {
      console.log("OH NO");
      return null;
    } else {
      console.log("basic" + basic_results);
      console.log("pets" + pet_results.rows);
      return {
        ...basic_results.rows[0],
        pets: pet_results.rows,
        reviews: review_results.rows,
      };
    }
  }

  async addNewCreditCard(
    username,
    card_num,
    card_expiry,
    card_cvv,
    cardholder_name
  ) {
    let query = `UPDATE ${this.table}
                        SET card_num = '${card_num}', card_expiry = '${card_expiry}', card_cvv = '${card_cvv}', cardholder_name = '${cardholder_name}'
                        WHERE username = '${username}'
                        RETURNING username, card_num`;
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
}

module.exports = new PetOwner();
