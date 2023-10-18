import express from 'express';
import eventFeedbackController from '../controllers/eventFeedbackController.js';

const router = express.Router();

router.post('/create', eventFeedbackController.submitFeedback); // Submit feedback
router.get('/:eventId', eventFeedbackController.getEventFeedback); // Get event feedback

// Add more routes for updating and deleting feedback if needed

export default router;
