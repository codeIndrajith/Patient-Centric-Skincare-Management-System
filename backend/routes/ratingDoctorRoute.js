import express from 'express';
import {addRatingDoctor, getRatingLength} from '../controllers/ratingDoctorController.js';

const router = express.Router();

router.post('/', addRatingDoctor);
router.get('/length/:id', getRatingLength);

export default router;
