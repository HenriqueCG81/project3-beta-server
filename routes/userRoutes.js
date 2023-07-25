const express = require('express');
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailbilityController,
  userAppointmentsController,
  updateUserProfileController
} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//login Post

router.post('/login', loginController);

//Register || Post

router.post('/register', registerController);

// auth || post
router.post('/getUserData', authMiddleware, authController);

// Apply Doctor || post
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// Notification || post
router.post(
  '/get-all-notification',
  authMiddleware,
  getAllNotificationController
);
router.post(
  '/delete-all-notification',
  authMiddleware,
  deleteAllNotificationController
);

//get All Doctors
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

//Bookappointment

router.post('/book-appointment', authMiddleware, bookAppointmentController);

// booking available time

router.post(
  '/booking-availability',
  authMiddleware,
  bookingAvailbilityController
);

//appointment list

router.get('/user-appointments', authMiddleware, userAppointmentsController);
router.post('/updateProfile', authMiddleware, updateUserProfileController);
module.exports = router;
