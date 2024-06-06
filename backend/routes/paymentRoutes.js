// paymentRoutes.js
import express from 'express';
import paymentController from '../controllers/paymentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkout',  paymentController.checkout);
router.post('/paymentverification', paymentController.paymentVerification);
// Other payment-related routes...

export default router;
