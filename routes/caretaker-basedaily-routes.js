let router = require("express").Router();
// Import contact controller
let basedaily_controller = require("../controllers/basedaily-controller");

// Contact routes
router
  .route("/")
  .get(basedaily_controller.index)
  .post(basedaily_controller.new);

router.route("/:username").post(basedaily_controller.view);

module.exports = router;
