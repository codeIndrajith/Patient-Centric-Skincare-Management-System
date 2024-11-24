import mongoose from 'mongoose';

// Create Treatment schema
const RatingTreatmentSchema = mongoose.Schema({
  treatment_id: {
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

const TreatmentRatings = mongoose.model('TreatmentRatings', RatingTreatmentSchema);
export default TreatmentRatings;
