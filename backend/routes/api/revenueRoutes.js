import express from 'express';
import revenueController from '../controllers/revenueController.js';
import { verifyToken } from '../../config/middleware/authMiddleware.js';

const router = express.Router();

// GET all events

// Define routes for event-related functionality
router.get('/revenue-by-month', revenueController.getRevenueByMonth);

//  Define more routes as needed

export default router;

