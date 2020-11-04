let router = require("express").Router();
// Import contact controller
let petowner_controller = require("../controllers/petowner-controller");

// Contact routes
router.route("/").get(petowner_controller.index).post(petowner_controller.new);

router
  .route("/:username")
  .get(petowner_controller.profileInfo)
  .post(petowner_controller.view);

router.route("/:username/creditcard").post(petowner_controller.newCreditCard);

module.exports = router;
