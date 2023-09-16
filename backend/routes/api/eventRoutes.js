import express from 'express';
import eventController from '../controllers/eventController.js';

const router = express.Router();

// GET all events

// Define routes for event-related functionality
router.post('/create', eventController.postEvent); // Create a new event
router.route("/", eventController.getAllEvents); // get all events
router.put('/:id', eventController.updateEvent); // Update event details by ID
router.delete('/:id', eventController.deleteEvent); // Delete an event by ID
//  Define more routes as needed

export default router;

