const doctorModel = require('../models/doctor.Models');
const userModel = require('../models/user.Models');

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: 'All users list',
      data: users
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error from get all users controller`,
      error
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: 'All doctors list',
      data: doctors
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error from get all doctors controller`,
      error
    });
  }
};

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      title: 'doctor-account-request-updated',
      message: `Your account status has been updated to ${status}`,
      onClickPath: '/notification'
    });

    user.isDoctor === 'approved' ? true : false;
    if (status === 'approved') {
      user.isDoctor = true;
    }
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Account status updated successfully',
      data: doctor
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error from change account status controller`,
      error
    });
  }
};
const deleteUserController = async (req, res) => {
  try {
    // Find the user by ID
    const user = await userModel.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }

    // Check if the user is a doctor
    if (user.isDoctor) {
      // If the user is a doctor, find and delete the associated doctor record
      await doctorModel.findOneAndDelete({ userId: req.params.userId });
    }

    // Delete the user
    const deletedUser = await userModel.findByIdAndDelete(req.params.userId);

    res.status(200).send({
      success: true,
      message: 'User and associated doctor deleted successfully',
      data: deletedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error deleting user',
      error
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
  deleteUserController
};
