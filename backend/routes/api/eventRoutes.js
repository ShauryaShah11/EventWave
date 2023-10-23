import express from 'express';
import eventController from '../controllers/eventController.js';
import { verifyToken } from '../../config/middleware/authMiddleware.js';

const router = express.Router();

// GET all events

// Define routes for event-related functionality
// Define routes for event-related functionality
router.get('/', eventController.getAllEvents);
router.get('/featured', eventController.getFeaturedEvent);
router.get('/:eventId/attendees', eventController.getAttendeesByEventId);
router.get('/search', eventController.searchEvents);
router.get('/count/:userId', eventController.getEventCountByOrganizerId);
router.get('/count/events-attended/:userId', eventController.getEventsAttendedByAttendeesOfOrganizer);
router.get('/:eventId', eventController.getEventById);
router.get('/organizer/:userId', verifyToken, eventController.getEventByOrganizerId);
router.get('/events-attended/:userId', verifyToken, eventController.getEventsAttendedByUser);
router.post('/create', verifyToken, eventController.postEvent); // Create a new event
router.put('/:eventId', verifyToken, eventController.updateEvent); // Update event details by ID
router.put('/toggle-feature/:eventId', verifyToken, eventController.toggleEventFeature); // Update event feature by ID
router.delete('/:eventId', verifyToken, eventController.deleteEvent); // Delete an event by ID
router.post('/enrollment/', verifyToken, eventController.enrollUserInEvent);



//  Define more routes as needed

export default router;

