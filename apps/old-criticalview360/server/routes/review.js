import express from 'express';
import { getCardReview, updateCardReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/:id', getCardReview);
router.put('/:id', updateCardReview);

export default router;
