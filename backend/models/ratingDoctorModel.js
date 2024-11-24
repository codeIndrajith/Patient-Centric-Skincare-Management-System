import mongoose from 'mongoose';

// Create Treatment schema
const RatingDoctorSchema = mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatments',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  feedback: {
    type: String,
    required: true,
  }
});

const DoctorRatings = mongoose.model('DoctorRatings', RatingDoctorSchema);
export default DoctorRatings;
