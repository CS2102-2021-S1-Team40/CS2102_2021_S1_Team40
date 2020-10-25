const pool = require("../pools");

class Leave {
  constructor() {
    this.pool = pool;
    this.table = "leaves_applied";
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async getAllLeaves() {
    let query = `SELECT * FROM ${this.table}`;
    const results = await this.pool.query(query);
    return results.rows;
  }

  async getUserLeaves(username) {
    let query = `SELECT (start_date, end_date, num_of_days) FROM ${this.table}
                    WHERE ftct_username='${username}'
                    ORDER BY start_date ASC`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async checkNoPets(username, start_date, end_date) {
    let query = `SELECT * FROM bids 
                    WHERE caretaker_username = '${username}'
                    AND '${start_date}' <= end_date AND start_date <= '${end_date}'
                    AND isSuccessful = true`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      // no pets
      return true;
    } else {
      return false;
    }
  }

  async addNewLeave(username, start_date, end_date) {
    let query = `INSERT INTO ${this.table} (ftct_username, start_date, end_date, num_of_days) 
                  VALUES ('${username}', '${start_date}', '${end_date}', '${end_date}'::DATE - '${start_date}'::DATE + 1)
                  RETURNING ftct_username, start_date, end_date, num_of_days`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async updateLeave(
    username,
    old_start_date,
    old_end_date,
    new_start_date,
    new_end_date
  ) {
    let query = `UPDATE ${this.table} SET start_date = '${new_start_date}', end_date = '${new_end_date}', num_of_days = '${new_end_date}'::DATE - '${new_start_date}'::DATE + 1
                  WHERE ftct_username = '${username}' AND start_date = '${old_start_date}' AND end_date = '${old_end_date}'
                  RETURNING ftct_username, start_date, end_date`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async deleteLeave(username, start_date, end_date) {
    let query = `DELETE FROM ${this.table}
                  WHERE ftct_username = '${username}' AND start_date = '${start_date}' AND end_date = '${end_date}'
                  RETURNING ftct_username, start_date, end_date`;
    const results = await this.pool.query(query);
    if (results.rows.length == 0) {
      return null;
    } else {
      return results.rows;
    }
  }
}

module.exports = new Leave();
