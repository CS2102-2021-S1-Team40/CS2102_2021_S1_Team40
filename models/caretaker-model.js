const pool = require("../pools");

class Caretaker {
  constructor() {
    this.pool = pool;
    this.table = "caretakers";
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async getRatings(caretaker_username) {
    let query = `SELECT rating, review
                FROM  bids
                WHERE isSuccessful AND rating IS NOT NULL AND review IS NOT NULL
                      AND caretaker_username = '${caretaker_username}'`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async getRequiredCaretakers(maximum_price, pet_type, start_date, end_date) {
    let query = `SELECT   a.username, a.advertised_price, a.start_date, a.end_date
                  FROM    availabilities a, (SELECT username AS caretaker_username FROM parttime_caretakers
                                            EXCEPT
                                            SELECT  b.caretaker_username AS caretaker_username
                                             FROM    bids b
                                             WHERE   isSuccessful
                                                AND b.start_date <= '${end_date}' AND b.end_date >= '${start_date}'
                                            GROUP BY b.caretaker_username
                                            HAVING  CASE
                                                        WHEN (SELECT AVG(rating) FROM bids b1 WHERE b1.caretaker_username = b.caretaker_username) >= 4
                                                            THEN COUNT(b.caretaker_username) >= 5
                                                    ELSE COUNT(b.caretaker_username) >= 2
                                                    END) canbid
                  WHERE   a.username IN (SELECT * FROM parttime_caretakers)
                          AND a.advertised_price <= ${maximum_price} AND a.pet_type = '${pet_type}' 
                          AND a.start_date <= '${start_date}' AND a.end_date >= '${end_date}'
                          AND a.username = canbid.caretaker_username
                UNION
                SELECT    bd.ftct_username AS username, bd.base_price * (SELECT  CASE 
                                                                                    WHEN AVG(rating) IS NULL THEN 1
                                                                                    ELSE AVG(rating)
                                                                                  END
                                                                          FROM bids 
                                                                          WHERE bd.ftct_username = bids.caretaker_username AND rating IS NOT NULL AND isSuccessful = TRUE) AS advertised_price, '${start_date}' AS start_date, '${end_date}' AS end_date
                FROM      base_dailys bd, (SELECT username
                                          FROM  fulltime_caretakers
                                          EXCEPT
                                          SELECT ftct_username
                                          FROM   leaves_applied leave2
                                          WHERE   leave2.start_date <= '${end_date}' AND leave2.end_date >= '${start_date}') notonleave, (SELECT username AS caretaker_username FROM fulltime_caretakers
                                                                                                                                          EXCEPT
                                                                                                                                          SELECT b3.caretaker_username
                                                                                                                                          FROM    bids b3 
                                                                                                                                          WHERE   isSuccessful
                                                                                                                                              AND b3.start_date <= '${end_date}' AND b3.end_date >= '${start_date}'
                                                                                                                                          GROUP BY b3.caretaker_username
                                                                                                                                          HAVING   COUNT(b3.caretaker_username) >= 5) notoverbooked

                WHERE     bd.ftct_username  = notonleave.username AND notoverbooked.caretaker_username = bd.ftct_username AND  bd.pet_type = '${pet_type}'
                          AND bd.base_price * (SELECT  CASE 
                                                          WHEN AVG(rating) IS NULL THEN 1
                                                          ELSE AVG(rating)
                                                          END
                                              FROM bids 
                                              WHERE bd.ftct_username = bids.caretaker_username AND rating IS NOT NULL AND isSuccessful = TRUE) <= ${maximum_price}`;
    const results = await this.pool.query(query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return results.rows;
    }
  }

  async get() {
    let query = `SELECT username FROM ${this.table};`;
    const results = await this.pool.query(query);
    return results.rows;
  }

  async getSingleCareTaker(username) {
    let query = `SELECT t.username, t.type FROM (
      SELECT username, 'fulltime' AS type FROM fulltime_caretakers
      UNION
      SELECT username, 'parttime' AS type FROM parttime_caretakers
  ) AS t WHERE t.username = '${username}'`;
    const result = await this.pool.query(query);
    if (result.rows.length === 0) {
      return null;
    } else {
      return {
        username: username,
        type: result.rows.map((r) => r.type),
      };
    }
  }

  async addNewCareTaker(username, password, role) {
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

  async getProfileInfo(username) {
    let query = `SELECT info.job_type, info.pet_days, COALESCE(CASE
                                            WHEN job_type = 'Full Time' THEN
                                                CASE WHEN pet_days > 60 THEN 3000 + excess_price
                                                ELSE 3000
                                                END
                                            WHEN job_type = 'Part Time' THEN 0.75 * total_price
                                            ELSE 0
                                            END, 0) AS salary
                    FROM (
                      SELECT * FROM (
                          SELECT CASE
                            WHEN '${username}' IN (SELECT * FROM fulltime_caretakers) THEN 'Full Time'
                            WHEN '${username}' IN (SELECT * FROM parttime_caretakers) THEN 'Part Time'
                            END AS job_type
                      ) AS jt, (
                          SELECT COALESCE(sum(b1.end_date - b1.start_date), 0) AS pet_days, sum(b1.price) AS total_price, CASE
                                                                                                        WHEN sum(b1.end_date - b1.start_date) > 60 THEN (
                                                                                                            SELECT sum(b2.price) FROM bids AS b2
                                                                                                            WHERE b2.caretaker_username = '${username}'
                                                                                                              AND b2.start_date >= date_trunc('month', CURRENT_DATE) + INTERVAL '60 days'
                                                                                                              AND b2.end_date < NOW()
                                                                                                              AND b2.isSuccessful
                                                                                                        )
                                                                                                        ELSE 0
                                                                                                    END AS excess_price
                          FROM bids AS b1
                          WHERE b1.caretaker_username = '${username}'
                          AND b1.start_date >= date_trunc('month', CURRENT_DATE)
                          AND b1.end_date < CURRENT_DATE
                          AND b1.isSuccessful
                      ) AS oi
                 ) AS info`;
    const results = await this.pool.query(query);
    let reviews_query = `SELECT petowner_username, pet_name, review, rating
                            FROM bids
                            WHERE isSuccessful
                            AND end_date < CURRENT_DATE
                            AND caretaker_username = '${username}'`;
    const reviews_results = await this.pool.query(reviews_query);
    let ongoing_query = `SELECT petowner_username, pet_name, start_date, end_date, price, transfer_method
                            FROM bids
                            WHERE isSuccessful
                            AND end_date >= CURRENT_DATE
                            AND caretaker_username = '${username}'`;
    const ongoing_results = await this.pool.query(ongoing_query);
    let past_query = `SELECT petowner_username, pet_name, start_date, end_date, price, transfer_method
                            FROM bids
                            WHERE isSuccessful
                            AND end_date < CURRENT_DATE
                            AND caretaker_username = '${username}'`;
    const past_results = await this.pool.query(past_query);
    let avail_query = `SELECT start_date, end_date, pet_type, advertised_price FROM availabilities
                            WHERE username = '${username}'
                            AND start_date >= CURRENT_DATE`;
    const avail_results = await this.pool.query(avail_query);
    if (results.rows.length === 0) {
      return null;
    } else {
      return {
        ...results.rows[0],
        reviews: reviews_results.rows,
        ongoing: ongoing_results.rows,
        past: past_results.rows,
        availability: avail_results.rows,
      };
    }
  }

  async getAdminInfo(username) {
    let admin_check_query = `SELECT * FROM admins WHERE username = '${username}'`;
    const admin_check_results = await this.pool.query(admin_check_query);
    if (admin_check_results.rows.length === 0) {
      throw new Error("You are not an admin!");
    }
    let ct_query = `SELECT cts.username, cts.job_type, count(b.pet_name) AS num_pets, CASE
                                          WHEN job_type = 'Full Time' THEN
                                              CASE WHEN sum(b.end_date - b.start_date) > 60 THEN 3000 +
                                                CASE WHEN sum(b.end_date - b.start_date) > 60 THEN (
                                                        SELECT sum(b2.price) FROM bids AS b2
                                                        WHERE b2.caretaker_username = cts.username
                                                          AND b2.start_date >= date_trunc('month', CURRENT_DATE) + INTERVAL '60 days'
                                                          AND b2.end_date < NOW()
                                                          AND b2.isSuccessful
                                                    )
                                                    ELSE 0
                                                  END
                                               ELSE 3000
                                              END
                                          WHEN job_type = 'Part Time' THEN 0.75 * sum(COALESCE(b.price, 0))
                        END AS salary
                    FROM (
                             SELECT username, 'Full Time' AS job_type FROM fulltime_caretakers
                             UNION
                             SELECT username, 'Part Time' AS job_type FROM parttime_caretakers
                         ) AS cts LEFT JOIN bids b
                         ON b.caretaker_username = cts.username
                         AND b.isSuccessful
                         AND b.start_date >= date_trunc('month', CURRENT_DATE)
                         AND b.end_date < CURRENT_DATE
                    GROUP BY cts.username, cts.job_type
                    ORDER BY num_pets DESC`;
    const ct_results = await this.pool.query(ct_query);
    let agg_query = `SELECT count(*) AS num_jobs
                     FROM bids WHERE isSuccessful
                     AND start_date >= date_trunc('month', CURRENT_DATE)
                     AND start_date <= CURRENT_DATE`;
    const agg_results = await this.pool.query(agg_query);
    let base_price_query = `SELECT ftct_username AS username, base_price, pet_type FROM base_dailys;`;
    const base_price_results = await this.pool.query(base_price_query);
    const caretakers_ft = ct_results.rows.filter(
      (r) => r["job_type"] === "Full Time"
    );
    for (let bpr of base_price_results.rows) {
      let ct = caretakers_ft.find((cf) => cf.username === bpr.username);
      const bp = { pet_type: bpr.pet_type, base_price: bpr.base_price };
      if (ct) {
        if (ct["base_prices"]) {
          ct["base_prices"].push(bp);
        } else {
          ct["base_prices"] = [bp];
        }
      }
    }
    return {
      caretakers_ft,
      caretakers_pt: ct_results.rows.filter(
        (r) => r["job_type"] === "Part Time"
      ),
      caretakers_up: ct_results.rows.filter(
        (r) => r["num_pets"] < new Date().getDate() / 2
      ),
      total_salary: ct_results.rows.reduce(
        (a, r) => a + parseInt(r["salary"]),
        0
      ),
      admin_agg_info: agg_results.rows[0],
    };
  }

  async addNewAvail(avail) {
    const query = `INSERT INTO availabilities (username, pet_type, advertised_price, start_date, end_date)
                    VALUES ('${avail["username"]}', '${avail["pet_type"]}', '${avail["advertised_price"]}', '${avail["start_date"]}', '${avail["end_date"]}')
                    RETURNING username, pet_type, advertised_price, start_date, end_date`;
    const result = await this.pool.query(query);
    if (result.rows.length === 0) {
      return null;
    } else {
      return result.rows[0];
    }
  }

  async addBasePrice(info) {
    const query = `INSERT INTO base_dailys (ftct_username, pet_type, base_price)
                    VALUES ('${info["username"]}', '${info["pet_type"]}', '${info["base_price"]}')
                    RETURNING ftct_username AS username, pet_type, base_price`;
    const result = await this.pool.query(query);
    if (result.rows.length === 0) {
      return null;
    } else {
      return result.rows[0];
    }
  }

  async editBasePrice(info) {
    const query = `UPDATE base_dailys SET base_price = ${info["base_price"]}
                    WHERE ftct_username = '${info["username"]}'
                    AND pet_type = '${info["pet_type"]}'
                    RETURNING ftct_username AS username, pet_type, base_price`;
    const result = await this.pool.query(query);
    if (result.rows.length === 0) {
      return null;
    } else {
      return result.rows[0];
    }
  }
}

module.exports = new Caretaker();
