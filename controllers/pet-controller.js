let pet_model = require("../models/pet-model");
// Handle index actions
exports.index = async function (req, res) {
  try {
    const pets = await pet_model.get();
    res.json({
      status: "success",
      message: "Pets retrieved successfully",
      data: pets,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
};

// Handle getting pet name
exports.name = async function (req, res) {
  try {
    const pet_name = await pet_model.getPetName(
      req.body.petowner_username,
      req.body.pet_type
    );
    console.log("here at controller pet name: " + pet_name);
    res.json({
      status: "success",
      message: "Pet name retrieved successfully",
      data: pet_name,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

// Handle adding of pet info
exports.new = function (req, res) {
  try {
    const pet = await pet_model.addNewPet(
      req.body.petowner_username,
      req.body.pet_name,
      req.body.pet_type,
      req.body.special_requirements
    );
    if (pet) {
      res.status(200).json({
        status: "success",
        message: "Adding pet successful",
        data: petowner,
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Adding pet failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Handle view pet info
exports.view = function (req, res) {
  res.json({
    message: "To be implemented",
  });
};
// Handle update pet info
exports.update = function (req, res) {
  res.json({
    message: "To be implemented",
  });
};
// Handle delete pet
exports.delete = function (req, res) {
  res.json({
    message: "To be implemented",
  });
};
