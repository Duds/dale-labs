import express from 'express';
import { getCardVisualisation } from '../controllers/visualisationController.js';

const router = express.Router();

router.get('/:id', getCardVisualisation);

export default router;
