const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController
} = require('../controllers/adminCtrl');

const router = express.Router();

//get Method || Users

router.get('/getAllUsers', authMiddleware, getAllUsersController);

//get Method || Doctors

router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

router.post(
  '/changeAccountStatus',
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
