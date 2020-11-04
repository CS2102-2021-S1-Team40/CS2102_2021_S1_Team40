DROP TABLE IF EXISTS bids;
DROP TABLE IF EXISTS availabilities;

DROP TABLE IF EXISTS parttime_caretakers;

DROP TABLE IF EXISTS leaves_applied;
DROP TABLE IF EXISTS base_dailys;
DROP TABLE IF EXISTS fulltime_caretakers;

DROP TABLE IF EXISTS caretakers;
DROP TABLE IF EXISTS admins;

DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS petowners;


DROP FUNCTION IF EXISTS func_check_leaves_date_overlap_insert();
DROP FUNCTION IF EXISTS func_check_leaves_date_overlap_update();
DROP FUNCTION IF EXISTS func_check_avail_overlap_insert();
DROP FUNCTION IF EXISTS func_check_bids_before();
DROP FUNCTION IF EXISTS func_check_bids_after();
-- DROP FUNCTION IF EXISTS func_check_satisfy_2x150days;

DROP TRIGGER IF EXISTS tr_check_leaves_date_overlap_insert ON leaves_applied;
DROP TRIGGER IF EXISTS tr_check_leaves_date_overlap_update ON leaves_applied;
DROP TRIGGER IF EXISTS tr_check_bids_before ON bids;
DROP TRIGGER IF EXISTS tr_check_bids_after ON bids;
-- DROP TRIGGER IF EXISTS tr_check_satisfy_2x150days ON leaves_applied;


CREATE TABLE admins (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE caretakers (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE availabilities (
    username VARCHAR(50) REFERENCES caretakers (username) ON DELETE cascade,
    pet_type VARCHAR(20) NOT NULL,
    advertised_price NUMERIC NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY (username, start_date, end_date, advertised_price, pet_type)
);

CREATE TABLE fulltime_caretakers (
    username VARCHAR(50) PRIMARY KEY REFERENCES caretakers (username)
);

CREATE TABLE leaves_applied (
    ftct_username VARCHAR(50) REFERENCES fulltime_caretakers (username),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    num_of_days NUMERIC NOT NULL,
    CHECK (num_of_days >= 1),
    PRIMARY KEY(ftct_username, start_date, end_date)
);

CREATE TABLE base_dailys (
    ftct_username VARCHAR(50) REFERENCES fulltime_caretakers (username),
    base_price NUMERIC,
    pet_type VARCHAR(20) NOT NULL,
    PRIMARY KEY(ftct_username, base_price, pet_type)
);

CREATE TABLE parttime_caretakers (
    username VARCHAR(50) PRIMARY KEY REFERENCES caretakers (username)
);

CREATE TABLE petowners (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(256) NOT NULL,
    card_num NUMERIC(16),
    card_expiry NUMERIC(4),
    card_cvv NUMERIC(3),
    cardholder_name VARCHAR(256)
);

CREATE TABLE pets (
    petowner_username VARCHAR(50) REFERENCES petowners (username) ON DELETE cascade,
    pet_name VARCHAR(50) NOT NULL,
    pet_type VARCHAR(20) NOT NULL,
    special_requirements VARCHAR(256),
    PRIMARY KEY (petowner_username, pet_name)
);

CREATE TABLE bids (
    petowner_username VARCHAR(50),
    pet_name VARCHAR(50) NOT NULL,
    caretaker_username VARCHAR(50),
    start_date DATE,
    end_date DATE,
    price NUMERIC NOT NULL,
    transfer_method VARCHAR(100) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    review VARCHAR(200),
    rating INTEGER CHECK ((rating IS NULL) OR (rating >= 0 AND rating <= 5)),
    isSuccessful BOOLEAN DEFAULT NULL,
    FOREIGN KEY (petowner_username, pet_name) REFERENCES pets (petowner_username, pet_name),
    PRIMARY KEY (petowner_username, pet_name, caretaker_username, start_date, end_date),
    CHECK (petowner_username <> caretaker_username)
);

CREATE FUNCTION func_check_leaves_date_overlap_insert() RETURNS trigger AS
    $$
    BEGIN
    IF (EXISTS
            (
                SELECT 1
                FROM leaves_applied L
                WHERE NEW.ftct_username = L.ftct_username
                    AND (NEW.start_date <= L.end_date AND L.start_date <= NEW.end_date)
            )
        )
    THEN
        RAISE EXCEPTION 'The added leave must not overlap with any current leaves';
    END IF;

    RETURN NEW;

    END;
    $$
    LANGUAGE 'plpgsql';

CREATE FUNCTION func_check_leaves_date_overlap_update() RETURNS trigger AS
    $$
    BEGIN
    IF (EXISTS
            (
                SELECT 1
                FROM ( SELECT * FROM leaves_applied
                        EXCEPT
                        SELECT * FROM leaves_applied
                        WHERE ftct_username = OLD.ftct_username
                            AND start_date = OLD.start_date
                            AND end_date = OLD.end_date
                     ) as L
                WHERE NEW.ftct_username = L.ftct_username
                    AND (NEW.start_date <= L.end_date AND L.start_date <= NEW.end_date)
            )
        )
    THEN
        RAISE EXCEPTION 'The updated leave must not overlap with any current leaves. OLD start: %, OLD end: %, NEW start: %, NEW end: %', OLD.start_date, OLD.end_date, NEW.start_date, NEW.end_date;
    END IF;

    RETURN NEW;

    END;
    $$
    LANGUAGE 'plpgsql';

CREATE FUNCTION func_check_avail_overlap_insert() RETURNS TRIGGER AS
    $$
    BEGIN
    IF (EXISTS
            (
                SELECT 1
                FROM availabilities a
                WHERE NEW.username = a.username
                    AND NEW.pet_type = a.pet_type
                    AND (NEW.start_date <= a.end_date AND NEW.end_date >= a.start_date)
            )
        )
    THEN RAISE EXCEPTION 'The new availability must not overlap with any current availability of the same pet type';
    END IF;

    RETURN NEW;
    END;
    $$
    LANGUAGE 'plpgsql';

CREATE FUNCTION func_check_bids_before() RETURNS TRIGGER AS
    $$
    BEGIN
    IF (EXISTS 
        (
            (SELECT 1
                FROM bids B1
                WHERE NEW.caretaker_username = B1.caretaker_username
                    AND NEW.caretaker_username IN ( SELECT username FROM fulltime_caretakers )
                    AND (NEW.start_date <= B1.end_date AND NEW.end_date >= B1.start_date)
                    AND B1.isSuccessful = TRUE
                GROUP BY (NEW.caretaker_username)
                HAVING COUNT(*) >= 5
            )
            UNION
            (SELECT 1
                FROM bids B2
                WHERE NEW.caretaker_username = B2.caretaker_username
                    AND NEW.caretaker_username IN ( SELECT username FROM parttime_caretakers )
                    AND (NEW.start_date <= B2.end_date AND NEW.end_date >= B2.start_date)
                    AND B2.isSuccessful = TRUE
                GROUP BY (NEW.caretaker_username)
                HAVING CASE
                    WHEN ( SELECT AVG(rating) FROM bids B3 WHERE NEW.caretaker_username = B3.caretaker_username) >= 4
                        THEN COUNT(NEW.caretaker_username) >= 5
                    ELSE COUNT(NEW.caretaker_username) >= 2
                END
            )
        )
        AND NEW.isSuccessful = TRUE 
    )
    THEN RAISE EXCEPTION 'You are unable to accepts anymore bids as you have reached the maximum limit during the period of time.';
    END IF;

    RETURN NEW;
    END;
    $$
    LANGUAGE 'plpgsql';

CREATE FUNCTION func_check_bids_after() RETURNS TRIGGER AS
    $$
    BEGIN
        IF (NEW.isSuccessful = TRUE)
        THEN DELETE FROM bids B
                WHERE NEW.pet_name = B.pet_name
                    AND NEW.petowner_username = B.petowner_username
                    AND (NEW.start_date <= B.end_date AND NEW.end_date >= B.start_date)
                    AND B.isSuccessful IS NULL;
        END IF;
    RETURN NEW;
    END;
    $$
    LANGUAGE 'plpgsql';


-- CREATE FUNCTION func_check_satisfy_2x150days() RETURNS trigger AS
--     $$
--     BEGIN
--     IF (NOT EXISTS (
--                 SELECT NEW.ftct_username, COUNT(*)
--                 FROM leaves_applied L1, leaves_applied L2
--                 WHERE L1.ftct_username = L2.ftct_username 
--                     AND L1.ftct_username = NEW.ftct_username
--                     AND (
--                         (L1.end_date < L2.start_date
--                             AND NOT EXISTS ( SELECT 1
--                                                 FROM leaves_applied
--                                                 WHERE start_date < L2.start_date
--                                                     AND start_date > L1.end_date 
--                             ) 
--                             AND L1.end_date + 150 < L2.start_date 
--                         )
--                         OR
--                         (CURRENT_DATE + 150 < L1.start_date
--                             AND NOT EXISTS ( SELECT 1
--                                         FROM leaves_applied
--                                         WHERE start_date < L1.start_date
--                                             AND start_date > CURRENT_DATE
--                             )
--                         )
--                         OR
--                         (L1.start_date + 300 < CURRENT_DATE + 365
--                             AND NOT EXISTS ( SELECT 1
--                                         FROM leaves_applied
--                                         WHERE start_date > L1.start_date
--                                             AND start_date < CURRENT_DATE + 365
--                             )
--                         )
--                     )
--                 GROUP BY NEW.ftct_username
--                 HAVING COUNT(*) >= 2
--             )
--         OR
--         EXISTS (
--             SELECT 1
--                 FROM leaves_applied L6, leaves_applied L7
--                 WHERE L6.ftct_username = L7.ftct_username
--                     AND L6.ftct_username = NEW.ftct_username
--                     AND (
--                         (L6.end_date < L7.start_date
--                             AND NOT EXISTS ( SELECT 1
--                                                 FROM leaves_applied L8
--                                                 WHERE L8.start_date < L7.start_date
--                                                     AND L8.start_date > L6.end_date 
--                             ) 
--                             AND L6.end_date + 300 < L7.start_date 
--                         )
--                         OR
--                         (CURRENT_DATE + 300 < L6.start_date
--                             AND NOT EXISTS ( SELECT 1
--                                         FROM leaves_applied L9
--                                         WHERE L9.start_date < L6.start_date
--                                             AND L9.start_date > CURRENT_DATE
--                             )
--                         )
--                         OR
--                         (L6.start_date + 300 < CURRENT_DATE + 365
--                             AND NOT EXISTS ( SELECT 1
--                                         FROM leaves_applied L10
--                                         WHERE L10.start_date > L6.start_date
--                                             AND L10.start_date < CURRENT_DATE + 365
--                             )
--                         )
--                     )
--             )
--         )
--     THEN 
--         DELETE FROM leaves_applied
--             WHERE ftct_username = NEW.ftct_username
--                 AND start_date = NEW.start_date
--                 AND end_date = NEW.end_date;
--         RAISE EXCEPTION 'If you add this leave, you will not have 2 x 150 days of work!';
--     END IF;

--     RETURN NEW;

--     END;
--     $$
--     LANGUAGE 'plpgsql';


CREATE TRIGGER tr_check_leaves_date_overlap_insert BEFORE INSERT
ON leaves_applied FOR EACH ROW EXECUTE PROCEDURE func_check_leaves_date_overlap_insert();

CREATE TRIGGER tr_check_leaves_date_overlap_update BEFORE UPDATE
ON leaves_applied FOR EACH ROW EXECUTE PROCEDURE func_check_leaves_date_overlap_update();

CREATE TRIGGER tr_check_avail_overlap_insert BEFORE INSERT
on availabilities FOR EACH ROW EXECUTE PROCEDURE func_check_avail_overlap_insert();

CREATE TRIGGER tr_check_bids_before BEFORE UPDATE
on bids FOR EACH ROW EXECUTE PROCEDURE func_check_bids_before();

CREATE TRIGGER tr_check_bids_after AFTER UPDATE
on bids FOR EACH ROW EXECUTE PROCEDURE func_check_bids_after();

-- CREATE TRIGGER tr_check_satisfy_2x150days BEFORE DELETE OR INSERT OR UPDATE
-- ON leaves_applied EXECUTE PROCEDURE func_check_satisfy_2x150days();
