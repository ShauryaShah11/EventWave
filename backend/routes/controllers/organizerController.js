import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import User from '../../models/User.js'; // Import your User model
import Organizer from '../../models/Organizer.js'; // Import your Event model

// Sample organizerController.js

const organizerController = {
    // Create a new organizer
    async register(req, res) {
      try {  
        // Create a new user
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          role: "organizer",
        });
    
        const user = await newUser.save();
    
        // Create a new organizer
        const newOrganizer = new Organizer({
          userId: user._id, // Reference the user
          companyName: req.body.companyName,
          companyAddress: req.body.companyAddress,
          contactNumber: req.body.contactNumber,
        });
    
        // Save the new organizer to the database
        await newOrganizer.save();
    
        return res.status(201).json({ message: 'Organizer registered successfully!' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to register Organizer.' });
      }
    },
    
    // Get organizer details by ID
    async getOrganizerById(req, res)  {

      const userId = req.params.id;
      try {
        const organizer = await Organizer.findOne({userId:userId});

        const organizerId = organizer._id;
        const organizerWithUserDetails = await Organizer.findById(organizerId)
          .populate('userId', 'email username')
          .select('companyName companyAddress contactNumber');
    
        if (!organizerWithUserDetails) {
          return res.status(404).json({ error: 'Organizer not found' });
        }
    
        res.json(organizerWithUserDetails);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    // Update organizer details by ID
    async updateOrganizer(req, res) {
      try {
        const userId = req.params.id;
        const { username, email, companyName, companyAddress, contactNumber } = req.body;

        const organizerData = await Organizer.findOne({userId:userId});

        const organizerId = organizerData._id;
    
        // Fetch the Organizer document
        const organizer = await Organizer.findByIdAndUpdate(
          organizerId,
          {
            companyName,
            companyAddress,
            contactNumber,
          },
          { new: true }
        );
    
        if (!organizer) {
          return res.status(404).json({ error: 'Organizer not found' });
        }
    
        // Find the User associated with the Organizer
        const user = await User.findById(organizer.userId);
    
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
    
        res.status(200).json({ message: 'Organizer and User updated successfully' });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to update Organizer.' });
      }
    },    
    

  async getAllOrganizer(req, res) {
      try {
        const organizersWithUserDetails = await Organizer.find()
          .populate('userId', 'email username')
          .select('companyName companyAddress contactNumber');
    
        res.json(organizersWithUserDetails);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  },

  async removeOrganizer(req, res) {
    try {
      const organizerId = req.params.id;

      // Step 1: Find the organizer by ID to get the associated user ID
      const organizer = await Organizer.findById(organizerId);
      if (!organizer) {
        return res.status(404).json({ error: 'Organizer not found.' });
      }

      const userId = organizer.userId; // Assuming 'userId' is the field containing the user's ID.

      // Step 2: Delete the organizer
      await Organizer.findByIdAndDelete(organizerId);

      // Step 3: Find and delete the associated user
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: 'Organizer deleted successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete Organizer.' });
    }
  }
  };
  
  export default organizerController;
  
