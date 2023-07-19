const doctorModel = require('../models/doctor.Models');
const appointmentModel = require('../models/appointmentModel');
const userModel = require('../models/user.Models');
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

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id
    });
    res.status(200).send({
      success: true,
      message: `Doctor appointments fetched successfully`,
      data: appointments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in doctor appointments`,
      error
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: 'Status Updated',
      message: `Your appointment has been updated ${status}`,
      onClickPath: '/doctor-appointments'
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: `Appointment status updated successfully`
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in update status`,
      error
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController
};
