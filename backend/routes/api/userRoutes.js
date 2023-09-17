import express from 'express';
import userController from '../controllers/userController.js'; // Import your authController

const router = express.Router();

// Define routes for user authentication
router.get('/', userController.getAllUsers); // get all users
router.delete('/:id', userController.removeUser); // User logout
router.post('/register', userController.register); // Register a new user
router.post('/login', userController.login); // User login
router.post('/logout', userController.logout); // User logout

// Add more authentication-related routes as needed

export default router;
