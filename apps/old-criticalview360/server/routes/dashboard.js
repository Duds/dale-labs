import express from 'express';
import { getUserDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', getUserDashboard);

export default router;
