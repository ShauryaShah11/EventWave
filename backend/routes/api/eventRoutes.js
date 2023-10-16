import express from 'express';
import eventController from '../controllers/eventController.js';
import { verifyToken } from '../../config/middleware/authMiddleware.js';

const router = express.Router();

// GET all events

// Define routes for event-related functionality
router.get('/', eventController.getAllEvents);
router.post('/create', verifyToken, eventController.postEvent); // Create a new event
router.put('/:id', verifyToken, eventController.updateEvent); // Update event details by ID
router.delete('/:id', verifyToken , eventController.deleteEvent); // Delete an event by ID
router.get('/:id', eventController.getEventById);
router.get('/organizer/:id', verifyToken, eventController.getEventByOrganizerId);
router.post('/enrollment/', verifyToken, eventController.enrollUserInEvent);
router.get('/events-attended/:userId', verifyToken, eventController.getEventsAttendedByUser)
//  Define more routes as needed

export default router;

