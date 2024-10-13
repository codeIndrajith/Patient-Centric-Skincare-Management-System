const mongoose = require('mongoose');

// Create Treatment schema
const TreatmentSchema = mongoose.Schema({
  treatment_id: {
    type: String,
    required: true,
  },
  treatment_name: {
    type: String,
    required: true,
  },
});

// Create Doctor schema
const DoctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  channeling_time: {
    type: String,
    required: true,
  },
  treatments: {
    type: [TreatmentSchema],
    required: true,
  },
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;
