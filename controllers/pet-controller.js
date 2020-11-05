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
exports.new = async function (req, res) {
  try {
    const pet = await pet_model.addNewPet(
      req.body.petowner_username,
      req.body.pet_name,
      req.body.pet_type,
      req.body.special_requirements
    );
    res.status(200).json({
      status: "success",
      message: "Adding pet successful",
      data: pet,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message + " - issue at controller",
    });
  }
};

exports.delete = async function (req, res) {
  try {
    const delete_pet = await pet_model.deletePet(
      req.body.petowner_username,
      req.body.pet_name
    );
    if (delete_pet) {
      res.status(200).json({
        status: "success",
        message: "Delete pet successful",
        data: delete_pet,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message:
          "Sorry, we are unable to delete this pet as you have an ongoing/past transaction.",
        data: delete_pet,
      });
    }
    
  } catch (err) {
    res.json({
      status: "error",
      message: "Sorry, we are unable to delete this pet as you have an ongoing/past transaction.",
    });
  }
};
