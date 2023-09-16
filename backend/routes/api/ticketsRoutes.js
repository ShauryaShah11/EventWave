import express from 'express';
import ticketsController from '../controllers/ticketsController.js';

const router = express.Router();

router.post('/create', ticketsController.createTicket);
// Define more routes for tickets

export default router;
