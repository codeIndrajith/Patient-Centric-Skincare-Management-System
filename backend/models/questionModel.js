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
  skinImage: {
    type: String,
    required: false,
  },
  isPregnantBreastfeeding: {
    type: String,
    required: true,
  },
  hasHistoryOfHeartAttacks: {
    type: String,
    required: true,
  },
});

const Questionnaire = mongoose.model('Question', questionnaireSchema);
export default Questionnaire;
