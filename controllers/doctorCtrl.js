const doctorModel = require('../models/doctor.Models');

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: `Doctor info fetched successfully`,
      data: doctor
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error from get doctor info controller`,
      error
    });
  }
};
//update profile

const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: `Doctor profile updated successfully`,
      data: doctor
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error from update profile controller`,
      error
    });
  }
};

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: `Doctor info fetched successfully`,
      data: doctor
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error from get doctor by id controller`,
      error
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController
};
