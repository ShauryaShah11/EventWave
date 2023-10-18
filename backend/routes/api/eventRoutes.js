import express from 'express';
import eventController from '../controllers/eventController.js';
import { verifyToken } from '../../config/middleware/authMiddleware.js';

const router = express.Router();

// GET all events

// Define routes for event-related functionality
router.get('/', eventController.getAllEvents);
router.post('/create', verifyToken, eventController.postEvent); // Create a new event
router.put('/:eventId', verifyToken, eventController.updateEvent); // Update event details by ID
router.delete('/:eventId', verifyToken , eventController.deleteEvent); // Delete an event by ID
router.get('/featured', eventController.getFeaturedEvent);
router.get('/:eventId', eventController.getEventById);
router.get('/:eventId/attendees', eventController.getAttendeesByEventId);
router.get('/organizer/:organizerId', verifyToken, eventController.getEventByOrganizerId);
router.post('/enrollment/', verifyToken, eventController.enrollUserInEvent);
router.get('/events-attended/:userId', verifyToken, eventController.getEventsAttendedByUser);
router.put('/toggle-feature/:eventId', verifyToken, eventController.toggleEventFeature ); // Update event details by ID

//  Define more routes as needed

export default router;

