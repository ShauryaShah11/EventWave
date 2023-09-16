// paymentRoutes.js
import express from 'express';
import paymentController from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create', paymentController.createPaymentTransaction);
router.put('/:id', paymentController.updatePaymentStatus);
// Other payment-related routes...

export default router;
