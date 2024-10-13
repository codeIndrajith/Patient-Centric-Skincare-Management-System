import asyncHandler from 'express-async-handler';
import Doctor from '../models/doctorModel.js';

// @desc    get Doctor to each treatments
// @route   GET /api/doctor/:treatmentId
// @access  Public

const getDoctor = asyncHandler(async (req, res) => {
  const treatment_id = req.params.id;

  const doctor = await Doctor.find({
    'treatments.treatment_id': treatment_id,
  });

  if (doctor) {
    res.json({
      success: true,
      data: doctor,
    });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

// @desc    get Doctor
// @route   GET /api/doctor/:id
// @access  Public

const getOneDoctor = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const doctor = await Doctor.findById(id);

  if (doctor) {
    res.json({
      success: true,
      data: doctor,
    });
  } else {
    res.status(404);
    throw new Error('Doctor not Found');
  }
});

export { getDoctor, getOneDoctor };
