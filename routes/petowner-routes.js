let router = require("express").Router();
// Import contact controller
let petowner_controller = require("../controllers/petowner-controller");

// Contact routes
router.route("/")
  .get(petowner_controller.index)
  .post(petowner_controller.new);

router.route("/:username")
  .post(petowner_controller.view);

console.log("here routes--------------------------");

router.route("/:username/creditcard")
  .post(petowner_controller.newCreditCard);

module.exports = router;
