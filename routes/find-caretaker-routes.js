let router = require("express").Router();
// Import contact controller
let caretaker_controller = require("../controllers/caretaker-controller");

// Contact routes
router
  .route("/")
  .get(caretaker_controller.filtered);

  module.exports = router;