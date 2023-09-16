import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import User from '../../models/User.js'; // Import your User model
import Organizer from '../../models/Organizer.js'; // Import your Event model

// Sample organizerController.js

const organizerController = {
    // Create a new organizer
    async register(req, res) {
      try {
        console.log(req.body);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        // Create a new user
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
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
    getOrganizerById: (req, res) => {
      const organizerId = req.params.id;
      // Example response
      res.status(200).json({ id: organizerId, name: 'Sample Organizer' });
    },
  
    // Update organizer details by ID
  async updateOrganizer (req, res) {
    try {
      const organizerId = req.params.id;

      // Find the organizer by ID
      const organizer = await Organizer.findById(organizerId);

      if (!organizer) {
        return res.status(404).json({ error: `Organizer ${organizerId} not found.` });
      }

      // Update the organizer details
      organizer.companyName = req.body.companyName;
      organizer.companyAddress = req.body.companyAddress;
      organizer.contactNumber = req.body.contactNumber;

      // Save the updated organizer details
      await organizer.save();

      return res.status(200).json({ message: `Organizer ${organizerId} updated.` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while updating the organizer.' });
    }
  },

  
    // Delete an organizer by ID
    async deleteOrganizer (req, res) {
      const organizerId = req.params.id;
      res.status(200).json({ message: `Organizer ${organizerId} deleted.` });
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
    }
  };
  
  export default organizerController;
  
