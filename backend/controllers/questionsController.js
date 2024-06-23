import asyncHandler from 'express-async-handler';
import Questionnaire from '../models/questionModel.js';
import cloudinary from 'cloudinary';

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

  const image = req.file.path;
  const result = await cloudinary.uploader.upload(image);
  const skinImage = result.secure_url;

  const questions = await Questionnaire.create({
    gender,
    age,
    skinType,
    allergies,
    skinIssues,
    skinImage,
    isPregnantBreastfeeding,
    hasHistoryOfHeartAttacks,
  });
  if (questions) {
    res.json({
      _id: questions._id,
      age: questions.age,
      skinType: questions.skinType,
      allergies: questions.allergies,
      skinIssues: questions.skinIssues,
      skinImage: questions.skinImage,
      isPregnantBreastfeeding: questions.isPregnantBreastfeeding,
      hasHistoryOfHeartAttacks: questions.hasHistoryOfHeartAttacks,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Questions data');
  }
  //   res.status(200).json({ message: 'send questions' });
});

export { questions };
