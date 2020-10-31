let basedaily_model = require("../models/basedaily-model");

exports.index = async function (req, res) {
  try {
    const basedailys = await basedaily_model.get();
    res.json({
      status: "success",
      message: "Base dailys retrieved successfully",
      data: basedailys,
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
    const basedaily = await basedaily_model.getBaseDaily(
      req.params.ftct_username
    );
    if (basedaily) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: basedaily,
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
    const basedaily = await basedaily_model.addBaseDaily(
      req.body.ftct_username,
      req.body.base_price,
      req.body.pet_type
    );
    if (basedaily) {
      res.status(200).json({
        status: "success",
        message: "Add basedaily successful",
        data: basedaily,
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Add basedaily failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
