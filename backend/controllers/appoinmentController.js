import asyncHandler from 'express-async-handler';
import Appointment from '../models/appointmentsModel.js';

// @desc    add appointment to each user
// @route   GET /api/appointment
// @access  Public

const addAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.create(req.body);

  if (appointment) {
    res.json({
      success: true,
      data: appointment,
    });
  } else {
    res.status(404);
    throw new Error('Appointment not create');
  }
});

// @desc    get appointment to each user
// @route   GET /api/appointment
// @access  Public

const getAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const appointment = await Appointment.find({
    patientId: id,
  });

  if (appointment) {
    res.json({
      success: true,
      data: appointment,
    });
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

export { getAppointment, addAppointment };
