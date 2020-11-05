const { end } = require("../pools");
const pool = require("../pools");

class Bid {
  constructor() {
    this.pool = pool;
    this.table = "bids";
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async getCaretakerBids(username) {
    let query = `SELECT (B.petowner_username, B.pet_name, P.pet_type, B.start_date, B.end_date, B.price, B.transfer_method, B.payment_method, P.special_requirements)
                    FROM ${this.table} B, pets P
                    WHERE B.caretaker_username='${username}'
                    AND B.isSuccessful IS NULL
                    AND B.petowner_username = P.petowner_username
                    AND B.pet_name = P.pet_name
                    ORDER BY B.start_date ASC`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async acceptBid(
    petowner_username,
    pet_name,
    caretaker_username,
    start_date,
    end_date
  ) {
    let query = `UPDATE ${this.table} SET isSuccessful = true
                  WHERE petowner_username = '${petowner_username}' AND pet_name = '${pet_name}' AND caretaker_username = '${caretaker_username}'
                      AND start_date = '${start_date}' AND end_date = '${end_date}'
                  RETURNING *`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async declineBid(
    petowner_username,
    pet_name,
    caretaker_username,
    start_date,
    end_date
  ) {
    let query = `UPDATE ${this.table} SET isSuccessful = false
                  WHERE petowner_username = '${petowner_username}' AND pet_name = '${pet_name}' AND caretaker_username = '${caretaker_username}'
                      AND start_date = '${start_date}' AND end_date = '${end_date}'
                  RETURNING *`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async getPetownerBids(username) {
    let query = `SELECT (B.caretaker_username, B.pet_name, P.pet_type, B.start_date, B.end_date, B.price, B.transfer_method, B.payment_method, P.special_requirements)
                    FROM ${this.table} B, pets P
                    WHERE B.petowner_username='${username}'
                    AND B.isSuccessful IS NULL
                    AND B.petowner_username = P.petowner_username
                    AND B.pet_name = P.pet_name
                    ORDER BY start_date ASC`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async cancelBid(
    petowner_username,
    pet_name,
    caretaker_username,
    start_date,
    end_date
  ) {
    let query = `DELETE FROM ${this.table}
                  WHERE petowner_username = '${petowner_username}' AND pet_name = '${pet_name}' AND caretaker_username = '${caretaker_username}'
                      AND start_date = '${start_date}' AND end_date = '${end_date}'
                  RETURNING *`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async addBid(
    petowner_username,
    pet_name,
    caretaker_username,
    start_date,
    end_date,
    price,
    transfer_method,
    payment_method
  ) {
    let query = `INSERT INTO ${this.table} (petowner_username, pet_name, caretaker_username, start_date, end_date, price, transfer_method, payment_method, review, rating, isSuccessful)
                    VALUES ('${petowner_username}', '${pet_name}', '${caretaker_username}', '${start_date}', '${end_date}', ${price}, '${transfer_method}', '${payment_method}', null, null, null)
                    RETURNING *`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async editReview(
    petowner_username,
    pet_name,
    caretaker_username,
    start_date,
    end_date,
    rating,
    review
  ) {
    console.log("edit review model start");
    let query = `UPDATE ${this.table}
                      SET review = '${review}', rating = '${rating}'
                      WHERE petowner_username = '${petowner_username}'
                        AND pet_name = '${pet_name}'
                        AND caretaker_username = '${caretaker_username}'
                        AND start_date = '${start_date}'
                        AND end_date = '${end_date}'
                      RETURNING rating, review`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return results.rows;
    }
  }
}

module.exports = new Bid();
