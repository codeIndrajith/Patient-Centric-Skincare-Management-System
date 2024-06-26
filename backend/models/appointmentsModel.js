import mongoose from 'mongoose';

const appointmentsSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  patientPhoneNumber: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Appointments = mongoose.model('Appointments', appointmentsSchema);
export default Appointments;
