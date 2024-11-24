import RatingTreatment from "../models/ratingTreatmentModel.js";
import asyncHandler from 'express-async-handler';

// @desc    add rating to treatment
// @route   POST /api/rating-treatment
// @access  Private
const addRatingTreatment = asyncHandler(async (req, res) => {
    const rating = await RatingTreatment.create(req.body);
  
    if (rating) {
      res.json({
        success: true,
        message: "Rating add success to treatment"
      });
    } else {
      res.status(404);
      throw new Error('Rating not add');
    }
  });

// @desc    get rating length
// @route   GET /api/rating-treatment/length/:id
// @access  Private
const getRatingLength = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const data = await RatingTreatment.find({treatment_id: id});

  if (data) {
    res.json({
      success: true,
      length: data.length
    });
  } else {
    res.status(404);
    throw new Error('Rating not found');
  }
});

  export {addRatingTreatment,  getRatingLength};