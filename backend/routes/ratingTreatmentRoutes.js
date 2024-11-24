import express from 'express';
import {addRatingTreatment, getRatingLength} from '../controllers/ratingTreatmentController.js';

const router = express.Router();

router.post('/', addRatingTreatment);
router.get('/length/:id', getRatingLength);

export default router;
