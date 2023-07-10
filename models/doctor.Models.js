const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },

    firstName: {
      type: String,
      required: [true, 'Please enter your name']
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your name']
    },
    phone: {
      type: String,
      required: [true, 'Please enter your phone']
    },
    email: {
      type: String,
      required: [true, 'Please enter your email']
    },
    website: {
      type: String,
      required: [true, 'Please enter your website']
    },
    address: {
      type: String,
      required: [true, 'Please enter your address']
    },
    specialization: {
      type: String,
      required: [true, 'Please enter your specialization']
    },
    experience: {
      type: String,
      required: [true, 'Please enter your experience']
    },
    feesPerConsultation: {
      type: Number,
      required: [true, 'Please enter your feesPerCunsultation']
    },
    status: {
      type: String,
      default: 'pending'
    },

    timings: {
      type: Object,
      required: [true, 'Please enter your timings']
    }
  },
  { timestamps: true }
);

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;
