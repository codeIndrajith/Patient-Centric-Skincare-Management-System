import express from 'express';
import {
  getAppointment,
  addAppointment,
} from '../controllers/appoinmentController.js';

const router = express.Router();

router.post('/', addAppointment);
router.get('/:id', getAppointment);

export default router;
