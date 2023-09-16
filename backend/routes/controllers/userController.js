import bcrypt from 'bcrypt';
import User from '../../models/User.js'; // Import your User model
import Attendee from '../../models/Attendee.js'; // Import Attendees model
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import nodemailer from "nodemailer";

const userController = {
  async register(req, res) {
    // Implementation for user registration
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: "attendee",
      });

      // Save the user to the database
      const user = await newUser.save();
  
      // Save the new user to the database
  
      // Create a new attendee
      const newAttendee = new Attendee({
        userId: user._id, // Reference the user
        fullName: req.body.fullName,
        dateOfBirth: req.body.dateOfBirth,
        contactNumber: req.body.contactNumber,
      });
  
      // // // Save the new attendee to the database
      await newAttendee.save();
  
      return res.status(201).json({ message: 'Attendee registered successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to register attendee.' });
    }
  },
  async login(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      // Find the user by email
      const user = await User.findOne({ email });
      console.log(email, password);
      // If user not found or password doesn't match
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Return the token as a JSON response
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred during login.' });
    }
  },  

  async logout(req, res) {
    // Remove the token from localStorage or cookies
      localStorage.removeItem('jwtToken'); // Assuming you store the token in localStorage
      // Redirect to the login page or another appropriate page
      window.location.href = '/login';
  },

  async getAllUsers(req, res) {
    try {
      const attendeesWithUserDetails = await Attendee.find()
        .populate('userId', 'email username password')
        .select('fullName dateOfBirth contactNumber');
  
      res.json(attendeesWithUserDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Add more authentication-related methods as needed
};

export default userController;