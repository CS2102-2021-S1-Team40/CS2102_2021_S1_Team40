let parttimecaretaker_model = require("../models/parttimecaretaker-model");
// Handle index actions
exports.index = async function (req, res) {
  try {
    const parttime_caretakers = await parttimecaretaker_model.get();
    res.json({
      status: "success",
      message: "Part-time Caretakers retrieved successparty",
      data: parttime_caretakers,
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
    const parttime_caretaker = await parttimecaretaker_model.getSinglePTCareTaker(
      req.params.username
    );
    if (parttime_caretaker) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: parttime_caretaker,
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
    const parttime_caretaker = await parttimecaretaker_model.addNewPTCareTaker(
      req.body.username
    );
    if (parttime_caretaker) {
      res.status(200).json({
        status: "success",
        message: "Signup as a caretaker successful",
        data: parttime_caretaker,
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
