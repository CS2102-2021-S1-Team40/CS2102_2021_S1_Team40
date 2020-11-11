const dotenv = require("dotenv");
dotenv.config();
module.exports.db_connection_string = process.env.DATABASE_URL;
