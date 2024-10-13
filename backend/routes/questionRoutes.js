import express from 'express';
import {
  getting,
  questions,
  gettingOne,
} from '../controllers/questionsController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('skinImage'), questions);
router.get('/tre', getting);
router.get('/tre/:id', gettingOne);

export default router;
