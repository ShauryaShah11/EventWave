import express from 'express';
import organizerController from '../controllers/organizerController.js';
import { verifyToken } from '../../config/middleware/authMiddleware.js';

const router = express.Router();

// Define routes for organizer-related functionality
router.post('/register', organizerController.register); // Create a new organizer
router.get('/', verifyToken, organizerController.getAllOrganizer); // Get organizer details by ID
router.get('/:id', verifyToken, organizerController.getOrganizerById); // Get organizer details by ID
router.put('/:id', verifyToken, organizerController.updateOrganizer); // Update organizer details by ID
router.delete('/:id', verifyToken, organizerController.removeOrganizer); // Delete an organizer by ID

// Add more organizer-related routes as needed

export default router;
