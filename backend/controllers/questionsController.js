import asyncHandler from 'express-async-handler';
import Questionnaire from '../models/questionModel.js';

// @desc    send questions
// @route   POST /api/questionnaire
// @access  Public
const questions = asyncHandler(async (req, res) => {
  const {
    gender,
    age,
    skinType,
    allergies,
    skinIssues,
    isPregnantBreastfeeding,
    hasHistoryOfHeartAttacks,
  } = req.body;

  const questions = await Questionnaire.create({
    gender,
    age,
    skinType,
    allergies,
    skinIssues,
    isPregnantBreastfeeding,
    hasHistoryOfHeartAttacks,
  });
  if (questions) {
    res.json({
      _id: questions._id,
      name: questions.age,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Questions data');
  }
  //   res.status(200).json({ message: 'send questions' });
});

export { questions };
