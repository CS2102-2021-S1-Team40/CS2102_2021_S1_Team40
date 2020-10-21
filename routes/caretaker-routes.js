let router = require("express").Router();
// Import contact controller
let caretaker_controller = require("../controllers/caretaker-controller");

// Contact routes
router
  .route("/")
  .get(caretaker_controller.index)
  .post(caretaker_controller.new);

router
  .route("/:username")
  .get(caretaker_controller.profileInfo)
  .post(caretaker_controller.view);

module.exports = router;
