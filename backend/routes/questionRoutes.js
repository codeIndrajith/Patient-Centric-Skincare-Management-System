import express from 'express';
import { questions } from '../controllers/questionsController.js';

const router = express.Router();

router.post('/', questions);

export default router;
