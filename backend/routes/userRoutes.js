import express from 'express';
import userController from '../controllers/userController.js'; // Import your authController
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes for user authentication
router.post('/login', userController.login); // User login
router.post('/register', userController.register); // Register a new user
router.post('/logout', userController.logout); // User logout

router.get('/', userController.getAllUsers); // get all users

router.get('/count', userController.getAttendeeCount); 

router.get('/:id', userController.getUser);
router.get('/info/:id', userController.getUserById); // get all users
router.put('/update/:id', userController.updateUserById); // get all users

 // get all users
router.put('/:id', verifyToken, userController.updateUser); // update user
router.delete('/:id', verifyToken, userController.removeUser); // User logout

// Add more authentication-related routes as needed

export default router;
