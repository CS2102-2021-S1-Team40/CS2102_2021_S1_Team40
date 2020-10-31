let fulltimecaretaker_model = require("../models/fulltimecaretaker-model");
// Handle index actions
exports.index = async function (req, res) {
  try {
    const fulltime_caretakers = await fulltimecaretaker_model.get();
    res.json({
      status: "success",
      message: "Full-time Caretakers retrieved successfully",
      data: fulltime_caretakers,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

// Handle view user info
exports.view = async function (req, res) {
  try {
    const fulltime_caretaker = await fulltimecaretaker_model.getSingleFTCareTaker(
      req.params.username
    );
    if (fulltime_caretaker) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: fulltime_caretaker,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message: "User not found, check that your login details are correct",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Handle create user actions
exports.new = async function (req, res) {
  try {
    const fulltime_caretaker = await fulltimecaretaker_model.addNewFTCareTaker(
      req.body.username
    );
    if (fulltime_caretaker) {
      res.status(200).json({
        status: "success",
        message: "Signup as a caretaker successful",
        data: fulltime_caretaker,
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Signup as a caretaker failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
