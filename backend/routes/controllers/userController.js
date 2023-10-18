import bcrypt from 'bcrypt';
import User from '../../models/User.js'; // Import your User model
import Attendee from '../../models/Attendee.js'; // Import Attendees model
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import nodemailer from "nodemailer";

const userController = {
  async login(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      // Find the user by email
      const user = await User.findOne({ email });
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

  async register(req, res) {
    try {
      // Create a new user
      const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password, // Assuming the password is already hashed in the model
          role: "attendee",
      });

      // Save the user to the database
      const user = await newUser.save();

      // Create a new attendee
      const newAttendee = new Attendee({
          userId: user._id, // Reference the user
          fullName: req.body.fullName,
          dateOfBirth: req.body.dateOfBirth,
          contactNumber: req.body.contactNumber,
      });

      // Save the new attendee to the database
      await newAttendee.save();

      return res.status(201).json({ message: 'Attendee registered successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to register attendee.' });
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
  },

  async getUser(req, res) {
    const attendeeId = req.params.id; // Use req, not request
    try {
      const attendeeWithUserDetails = await Attendee.findById(attendeeId)
        .populate('userId', 'email username password')
        .select('fullName dateOfBirth contactNumber');
  
      if (!attendeeWithUserDetails) {
        return res.status(404).json({ error: 'Attendee not found' });
      }
  
      res.json(attendeeWithUserDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },  

  async updateUser(req, res){
    try{
      const attendeeId = req.params.id;
      const { username, email, fullName, contactNumber, dateOfBirth } = req.body;

      // Update the Attendee
      const attendee = await Attendee.findByIdAndUpdate(
        attendeeId,
        {
          fullName,
          dateOfBirth,
          contactNumber,
        },
        { new: true }
      );

      if (!attendee) {
        return res.status(404).json({ error: 'Attendee not found' });
      }

      // Find the User associated with the Attendee
      const user = await User.findById(attendee.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if email already exists in the database
      const existingEmailUser = await User.findOne({ email });

      if (existingEmailUser && existingEmailUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Check if contact number already exists in the database
      const existingContactNumberUser = await User.findOne({ contactNumber });

      if (existingContactNumberUser && existingContactNumberUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ error: 'Contact number already exists' });
      }
      
      // Update the User
      user.username = username;
      user.email = email;

      await user.save();

      res.status(200).json({ message: 'Attendee and User updated successfully' });
    }catch(error){
      return res.status(500).json({ error: 'Failed to Update attendee.' });
    }
  },

  async removeUser(req, res) {
    try {
      const attendeeId = req.params.id;

      // Step 1: Find the attendee by ID to get the associated user ID
      const attendee = await Attendee.findById(attendeeId);
      if (!attendee) {
        return res.status(404).json({ error: 'Attendee not found.' });
      }

      const userId = attendee.userId; // Assuming 'userId' is the field containing the user's ID.

      // Step 2: Delete the attendee
      await Attendee.findByIdAndDelete(attendeeId);

      // Step 3: Find and delete the associated user
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: 'Attendee deleted successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete attendee.' });
    }
  }

  // Add more authentication-related methods as needed
};

export default userController;
