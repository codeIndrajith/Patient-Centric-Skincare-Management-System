import asyncHandler from 'express-async-handler'
import Questionnaire from '../models/questionModel.js';
import aiTreatment from '../utils/RecommendationAI.js'

// @desc    send questions
// @route   GET /api/treatment/:id
// @access  Public

const treatments = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const predictData = await Questionnaire.findById(id)

  const text = await aiTreatment(predictData.predictResult.disease);
  const treatmentsArray = text.split('\n').map(item => item.replace(/^\d+\.\s*/, ''));
const treatmentObject = {
  treatment1: treatmentsArray[0].replace(/\*\*/g, '').trim(),
  treatment2: treatmentsArray[1].replace(/\*\*/g, '').trim()
};
  
  if (predictData) {
    res.json({
      success: true,
      data: {
        id: predictData._id,
      predictResult: predictData.predictResult,
      treatment: treatmentObject
      }
    });
  } else {
    res.status(500);
    throw new Error('Invalid Id');
  }
});

export {treatments}