import express from 'express';
import { treatments } from '../controllers/treatmentsController.js';

const router = express.Router();

router.get('/:id', treatments);

export default router;