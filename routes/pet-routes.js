let router = require("express").Router();
// Import contact controller
let pet_controller = require("../controllers/pet-controller");

// Contact routes
router
  .route("/")
  .get(pet_controller.index)
  .post(pet_controller.new);

router.route("/name").post(pet_controller.name);
// .get(pet_controller.view)
// .put(pet_controller.update)
// .delete(pet_controller.delete);

module.exports = router;
