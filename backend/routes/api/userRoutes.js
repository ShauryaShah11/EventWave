import express from 'express';
import userController from '../controllers/userController.js'; // Import your authController

const router = express.Router();

// Define routes for user authentication
router.post('/login', userController.login); // User login
router.post('/register', userController.register); // Register a new user
router.post('/logout', userController.logout); // User logout

router.get('/', userController.getAllUsers); // get all users

router.get('/:id', userController.getUser); // get all users
router.put('/:id', userController.updateUser); // update user
router.delete('/:id', userController.removeUser); // User logout

// Add more authentication-related routes as needed

export default router;
