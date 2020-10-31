let router = require("express").Router();
// Import contact controller
let bid_controller = require("../controllers/bid-controller");

// Contact routes
router.route("/").post(bid_controller.addBid);

module.exports = router;
