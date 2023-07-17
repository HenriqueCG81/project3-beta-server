const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    doctorInfo: {
      type: Object,
      required: true
    },
    userInfo: {
      type: Object,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: 'pending'
    },
    time: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const appointmentModel = model('appointments', appointmentSchema);
module.exports = appointmentModel;
