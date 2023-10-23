import express from 'express';
import revenueController from '../controllers/revenueController.js';
import { verifyToken } from '../../config/middleware/authMiddleware.js';

const router = express.Router();

// GET all events

// Define routes for event-related functionality
router.get('/revenue-by-month', verifyToken ,revenueController.getRevenueByMonth);
router.get('/revenue-by-month/:userId', verifyToken ,revenueController.getOrganizerRevenueByMonth);
router.get('/totalRevenue', verifyToken, revenueController.getRevenue);
router.get('/totalRevenue/:userId', verifyToken, revenueController.getRevenueByUserId);


//  Define more routes as needed

export default router;

