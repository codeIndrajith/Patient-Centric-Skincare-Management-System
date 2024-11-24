import RatingDoctor from "../models/ratingDoctorModel.js";
import asyncHandler from 'express-async-handler';

// @desc    add rating to doctor
// @route   POST /api/rating-doctor
// @access  Private
const addRatingDoctor = asyncHandler(async (req, res) => {
    const rating = await RatingDoctor.create(req.body);
  
    if (rating) {
      res.json({
        success: true,
        message: "Rating add success to doctor"
      });
    } else {
      res.status(404);
      throw new Error('Rating not add');
    }
  });

// @desc    get rating length
// @route   GET /api/rating-doctor/length/:id
// @access  Private
const getRatingLength = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const data = await RatingDoctor.find({doctor_id: id});

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

  export {addRatingDoctor, getRatingLength};