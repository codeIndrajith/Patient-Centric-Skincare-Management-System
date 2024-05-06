import mongoose from 'mongoose';

const questionnaireSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  skinType: {
    type: String,
    required: true,
  },
  allergies: {
    type: String,
    required: true,
  },
  skinIssues: {
    type: [String],
    required: true,
  },
  isPregnantBreastfeeding: {
    type: Boolean,
    default: false,
  },
  hasHistoryOfHeartAttacks: {
    type: Boolean,
    default: false,
  },
});

const Questionnaire = mongoose.model('Question', questionnaireSchema);
export default Questionnaire;
