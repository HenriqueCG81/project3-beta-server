const express = require('express');
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController
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
module.exports = router;
