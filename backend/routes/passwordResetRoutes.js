import express from 'express';
import passwordResetController from '../controllers/passwordResetController.js'; // Import your authController

const router = express.Router();

router.post("/forgot-password", passwordResetController.forgotPassword);
router.post("/reset-password", passwordResetController.resetPassword);

// Add more authentication-related routes as needed

export default router;
