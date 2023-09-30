import express from 'express';
import eventController from '../controllers/eventController.js';

const router = express.Router();

// GET all events

// Define routes for event-related functionality
router.get('/',eventController.getAllEvents);
router.post('/create', eventController.postEvent); // Create a new event
router.put('/:id', eventController.updateEvent); // Update event details by ID
router.delete('/:id', eventController.deleteEvent); // Delete an event by ID
router.get('/:id', eventController.getEventById);
router.get('/organizer/:id', eventController.getEventByOrganizerId);
//  Define more routes as needed

export default router;

