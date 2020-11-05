let router = require("express").Router();
// Import contact controller
let petowner_controller = require("../controllers/petowner-controller");
let bid_controller = require("../controllers/bid-controller");

// Contact routes
router.route("/").get(petowner_controller.index).post(petowner_controller.new);

router
  .route("/:username")
  .get(petowner_controller.profileInfo)
  .post(petowner_controller.view);

router
  .route("/:username/deletecreditcard")
  .put(petowner_controller.deleteCreditCard);

router.route("/:username/creditcard").put(petowner_controller.updateCreditCard);

router.route("/:username/reviews").put(bid_controller.updateReview);

module.exports = router;
