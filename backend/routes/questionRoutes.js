import express from 'express';
import { questions } from '../controllers/questionsController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('skinImage'), questions);

export default router;
