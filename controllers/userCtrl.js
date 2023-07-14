const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.Models');
const doctorModel = require('../models/doctor.Models');
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: 'User already exists' });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res
      .status(201)
      .send({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `register controller ${error.message}`
    });
  }
};
//login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ success: false, message: 'Invalid Email or Password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    res
      .status(200)
      .send({ message: 'Login Successfully', success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error login controller ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: 'User not found',
        success: false
      });
    } else {
      res.status(200).send({
        message: 'User found',
        success: true,
        data: user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error from auth controller ${error.message}`,
      success: false,
      error
    });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: 'pending' });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: 'apply-doctor-request',
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account.`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + ' ' + newDoctor.lastName,
        onClickPath: '/admin/doctors'
      }
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: `Doctor applied successfully`
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error while applying doctor `
    });
  }
};

const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: 'Notification marked as read',
      data: updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error
    });
  }
};

//Delete notification
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: 'Notification deleted successfully',
      data: updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error from delete notification controller`,
      error
    });
  }
};

// get all doctors
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: 'approved' });
    res.status(200).send({
      success: true,
      message: 'All doctors fetched successfully',
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

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController
};
