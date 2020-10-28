let caretaker_model = require("../models/caretaker-model");

// Handle view caretakers that fit requirements
exports.filtered = async function (req, res) {
  try {
    const caretakers = await caretaker_model.getRequiredCaretakers(
      req.body.maximum_price,
      req.body.pet_type,
      req.body.start_date,
      req.body.end_date
    );
    res.json({
      status: "success",
      message: "Caretakers retrieved successfully",
      data: caretakers,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

exports.index = async function (req, res) {
  try {
    const caretakers = await caretaker_model.get();
    res.json({
      status: "success",
      message: "Caretakers retrieved successfully",
      data: caretakers,
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
    const caretaker = await caretaker_model.getSingleCareTaker(
      req.params.username,
      req.body.password
    );
    if (caretaker) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: caretaker,
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
    const caretaker = await caretaker_model.addNewCareTaker(
      req.body.username,
      req.body.password,
      req.body.role
    );
    if (caretaker) {
      res.status(200).json({
        status: "success",
        message: "Signup as a caretaker successful",
        data: caretaker,
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Signup as a caretaker failed",
      });
    }
    await caretaker_model.addNewCareTaker(
      req.body.username,
      req.body.password,
      req.body.role
    );
    res.status(200).json({
      status: "success",
      message: "Signup as caretaker successful",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.profileInfo = async function (req, res) {
  try {
    const basicInfo = await caretaker_model.getProfileInfo(req.params.username);
    if (basicInfo) {
      res.status(200).json({
        status: "success",
        message: `Profile info retrieved for ${req.params.username}`,
        data: basicInfo,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: `Unknown error occurred retrieving basic info for ${req.params.username}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.adminInfo = async function (req, res) {
  try {
    const adminInfo = await caretaker_model.getAdminInfo(req.body.username);
    if (adminInfo) {
      res.status(200).json({
        status: "success",
        message: "Admin info retrieved",
        data: adminInfo,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Unknown error has occurred retrieving admin info",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
