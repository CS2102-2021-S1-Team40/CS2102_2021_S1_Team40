let router = require("express").Router();
// Import contact controller
let bid_controller = require("../controllers/bid-controller");

// Contact routes
router
  .route("/:username")
  .get(bid_controller.viewPetowner)
  .delete(bid_controller.cancelPetowner);

module.exports = router;
