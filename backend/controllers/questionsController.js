import asyncHandler from 'express-async-handler';
import Questionnaire from '../models/questionModel.js';
import Treatments from '../models/treatmentsModel.js';
import cloudinary from 'cloudinary';
import predictDisease from '../utils/predict.js';

// @desc    send questions
// @route   POST /api/questionnaire
// @access  Public

const questions = asyncHandler(async (req, res) => {
  const {
    gender,
    age,
    skinType,
    allergies,
    isPregnantBreastfeeding,
    hasHistoryOfHeartAttacks,
  } = req.body;

  const image = req.file.path;
  const result = await cloudinary.uploader.upload(image);
  const skinImage = result.secure_url;

  const { accuracy, disease, medicine } = await predictDisease(image);

  const questions = await Questionnaire.create({
    gender,
    age,
    skinType,
    allergies,
    skinImage,
    isPregnantBreastfeeding,
    hasHistoryOfHeartAttacks,
    predictResult: {
      accuracy,
      disease,
      medicine,
    },
  });
  if (questions) {
    res.json({
      _id: questions._id,
      age: questions.age,
      skinType: questions.skinType,
      allergies: questions.allergies,
      skinImage: questions.skinImage,
      isPregnantBreastfeeding: questions.isPregnantBreastfeeding,
      hasHistoryOfHeartAttacks: questions.hasHistoryOfHeartAttacks,
      predictResult: questions.predictResult,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Questions data');
  }
  //   res.status(200).json({ message: 'send questions' });
});

const getting = asyncHandler(async (req, res) => {
  const getData = await Treatments.find({});
  if (getData) {
    res.status(200).json({ success: true, data: getData });
  } else {
    res.status(404);
    throw new Error('Data not found');
  }
});

const gettingOne = asyncHandler(async (req, res) => {
  const getOne = await Treatments.findById(req.params.id);
  if (getOne) {
    res.status(200).json({ success: true, data: getOne });
  } else {
    res.status(404);
    throw new Error('Data not found');
  }
});

const gettingQuestion = asyncHandler(async (req, res) => {
  const getOne = await Questionnaire.findById(req.params.id);
  if (getOne) {
    res.status(200).json({ success: true, data: getOne });
  } else {
    res.status(404);
    throw new Error('Data not found');
  }
});

export { questions, getting, gettingOne, gettingQuestion };
