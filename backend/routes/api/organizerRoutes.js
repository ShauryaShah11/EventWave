import express from 'express';
import organizerController from '../controllers/organizerController.js';

const router = express.Router();

// Define routes for organizer-related functionality
router.post('/register', organizerController.register); // Create a new organizer
router.get('/', organizerController.getAllOrganizer); // Get organizer details by ID
router.get('/:id', organizerController.getOrganizerById); // Get organizer details by ID
router.put('/:id', organizerController.updateOrganizer); // Update organizer details by ID
router.delete('/:id', organizerController.removeOrganizer); // Delete an organizer by ID

// Add more organizer-related routes as needed

export default router;
