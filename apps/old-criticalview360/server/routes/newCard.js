import express from 'express';
import { createNewCard, getAllCards } from '../controllers/cardController.js';

const router = express.Router();

router.post('/', createNewCard);
router.get('/', getAllCards);

export default router;
