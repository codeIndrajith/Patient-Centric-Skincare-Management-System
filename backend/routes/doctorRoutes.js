import express from 'express';
import { getDoctor, getOneDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.get('/:id', getDoctor);
router.get('/doc/:id', getOneDoctor);

export default router;
