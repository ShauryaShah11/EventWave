// paymentRoutes.js
import express from 'express';
import paymentController from '../controllers/paymentController.js';
import { verifyToken } from '../../config/middleware/authMiddleware.js';

const router = express.Router();

router.post('/payment-confirm', verifyToken, paymentController.createPaymentTransaction);
router.put('/:id', paymentController.updatePaymentStatus);
// Other payment-related routes...

export default router;
