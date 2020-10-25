let bid_model = require("../models/bid-model");

// Handle view bid info
exports.viewCaretaker = async function (req, res) {
  try {
    const get_user_bids = await bid_model.getCaretakerBids(req.params.username);
    if (get_user_bids) {
      res.status(200).json({
        status: "success",
        message: "Caretaker's bids retrieved successfully.",
        data: get_user_bids,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message: "No bids found from caretaker!",
        data: get_user_bids,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

// Handle accept bid actions
exports.handleCaretaker = async function (req, res) {
  try {
    if (req.body.type == "Accept") {
      const accept_bid = await bid_model.acceptBid(
        req.body.petowner_username,
        req.body.pet_name,
        req.body.caretaker_username,
        req.body.start_date,
        req.body.end_date
      );
      if (accept_bid) {
        res.status(200).json({
          status: "success",
          message: "Bid accepted successfully.",
          data: accept_bid,
        });
      } else {
        res.status(404).json({
          status: "failure",
          message:
            "Bid not accepted, please check that you are logged in and you have chosen a valid bid.",
          data: accept_bid,
        });
      }
    } else if (req.body.type == "Decline") {
      const decline_bid = await bid_model.declineBid(
        req.body.petowner_username,
        req.body.pet_name,
        req.body.caretaker_username,
        req.body.start_date,
        req.body.end_date
      );
      if (decline_bid) {
        res.status(200).json({
          status: "success",
          message: "Bid declined successfully.",
          data: decline_bid,
        });
      } else {
        res.status(404).json({
          status: "failure",
          message:
            "Bid not declined, please check that you are logged in and you have chosen a valid bid.",
          data: decline_bid,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

// Handle view bid info
exports.viewPetowner = async function (req, res) {
  try {
    const get_user_bids = await bid_model.getPetownerBids(req.params.username);
    if (get_user_bids) {
      res.status(200).json({
        status: "success",
        message: "Petowner's bids retrieved successfully.",
        data: get_user_bids,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message: "No bids found from petowner!",
        data: get_user_bids,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

// Handle cancel bid info
exports.cancelPetowner = async function (req, res) {
  try {
    const cancel_bid = await bid_model.cancelBid(
      req.body.petowner_username,
      req.body.pet_name,
      req.body.caretaker_username,
      req.body.start_date,
      req.body.end_date
    );
    if (cancel_bid) {
      res.status(200).json({
        status: "success",
        message: "Bid cancelled successfully.",
        data: cancel_bid,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message:
          "Bid not cancelled, please check that you are logged in and you have chosen a valid bid.",
        data: cancel_bid,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};
