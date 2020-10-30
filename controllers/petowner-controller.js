let petowner_model = require("../models/petowner-model");
// Handle index actions
exports.index = async function (req, res) {
  try {
    const petowners = await petowner_model.get();
    res.json({
      status: "success",
      message: "Petowners retrieved successfully",
      data: petowners,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

// Handle view petowner info
exports.view = async function (req, res) {
  try {
    const petowner = await petowner_model.getSinglePetOwner(
      req.params.username,
      req.body.password
    );
    if (petowner) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: petowner,
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

// Handle create petowner actions
exports.new = async function (req, res) {
  try {
    const petowner = await petowner_model.addNewPetOwner(
      req.body.username,
      req.body.password,
      req.body.role
    );
    if (petowner) {
      res.status(200).json({
        status: "success",
        message: "Signup as a petowner successful",
        data: petowner,
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Signup as a petowner failed",
      });
    }
    await petowner_model.addNewPetOwner(
      req.body.username,
      req.body.password,
      req.body.role
    );
    res.status(200).json({
      status: "success",
      message: "Signup as petowner successful",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.newCreditCard = async function (req, res) {
  try {
    const credit_card = await petowner_model.addNewCreditCard(
      req.body.username,
      req.body.card_num,
      req.body.card_expiry,
      req.body.card_cvv,
      req.body.cardholder_name
    );
    console.log("here controller--------------------------");
    res.json({
      status: "success",
      message: "Added new credit card successfully",
      data: credit_card,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};
