let availability_model = require("../models/availability-model");

exports.index = async function (req, res) {
  try {
    const availabilities = await availability_model.get();
    res.json({
      status: "success",
      message: "availabilities retrieved successfully",
      data: availabilities,
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
    const availability = await availability_model.getAvailability(
      req.params.username
    );
    if (availability) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: availability,
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
    const availability = await availability_model.addAvailability(
      req.body.username,
      req.body.pet_type,
      req.body.advertised_price,
      req.body.start_date,
      req.body.end_date
    );
    if (availability) {
      res.status(200).json({
        status: "success",
        message: "Add availability successful",
        data: availability,
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Add availability failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
