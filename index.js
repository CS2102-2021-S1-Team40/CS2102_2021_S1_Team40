const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pet_routes = require("./routes/pet-routes");
const user_routes = require("./routes/user-routes");
const parttimecaretaker_routes = require("./routes/parttimecaretaker-routes");
const fulltimecaretaker_routes = require("./routes/fulltimecaretaker-routes");
const caretaker_routes = require("./routes/caretaker-routes");
const petowner_routes = require("./routes/petowner-routes");
const leave_routers = require("./routes/leave-routes");
const find_caretaker_routes = require("./routes/find-caretaker-routes");
const { db_connection_string } = require("./settings");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 3000;

if (!db_connection_string) {
  console.error("Please specify a connection string to a database!");
  process.exit(1);
}
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/pets", pet_routes);
app.use("/users/find-caretakers", find_caretaker_routes);
app.use("/users", user_routes);
app.use("/petowners", petowner_routes);
app.use("/caretakers", caretaker_routes);
app.use("/fulltime_caretakers", fulltimecaretaker_routes);
app.use("/parttime_caretakers", parttimecaretaker_routes);
app.use("/users/leaves", leave_routers);

app.listen(port, () => console.log(`Listening on port ${port}...`));
