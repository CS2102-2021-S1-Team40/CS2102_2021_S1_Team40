let router = require("express").Router();
// Import contact controller
let availability_controller = require("../controllers/availability-controller");

// Contact routes
router
  .route("/")
  .get(availability_controller.index)
  .post(availability_controller.new);

router.route("/:username").post(availability_controller.view);

module.exports = router;
