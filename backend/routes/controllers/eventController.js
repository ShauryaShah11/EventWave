import Event from "../../models/Event.js"; // Import your Event model
import Address from "../../models/Address.js";
import EventAttendees from "../../models/EventAttendees.js";
import PaymentTransactions from "../../models/PaymentTransactions.js";
import { upload } from "../../config/multerConfig.js"; // Adjust the path as needed

// Your event controller code here

const eventController = {
  // GET all events
  postEvent: [
    upload.array("eventImages", 5),
    async (req, res) => {
      console.log(req.body);
      console.log(req.files);

      try {
        const {
          organizerId,
          eventName,
          eventDescription,
          eventDate,
          ticketPrice,
          street,
          city,
          state,
          country,
          zipcode,
        } = req.body;

        const images = req.files.map((file) => file.filename);

        // Create a new address
        const newAddress = new Address({
          street,
          city,
          state,
          country,
          zipCode: zipcode,
        });

        // Save the address to the database
        const savedAddress = await newAddress.save();

        // Create a new event and associate it with the address and images
        const newEvent = new Event({
          organizerId,
          eventName,
          eventDescription,
          eventDate,
          ticketPrice,
          eventImages: images,
          eventAddress: savedAddress._id, // Use the saved address here
        });

        // Save the event to the database
        const savedEvent = await newEvent.save();

        // Respond with the newly created event's details
        return res
          .status(201)
          .json({ message: "Event created successfully", event: savedEvent });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Failed to create event", details: error.message });
      }
    },
  ],

  // Update event details by ID
  updateEvent: async (req, res) => {
    try {
      const eventId = req.params.id;
      const updatedData = req.body;

      await Event.findByIdAndUpdate(eventId, updatedData);
      return res.status(200).json({ message: "Event updated successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update event." });
    }
  },

  // Delete an event by ID
  deleteEvent: async (req, res) => {
    try {
      const eventId = req.params.id;

      await Event.findByIdAndDelete(eventId);
      return res.status(200).json({ message: "Event deleted successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to delete event." });
    }
  },

  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find().populate("organizerId");
      return res.status(200).json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch events." });
    }
  },

  getEventByOrganizerId: async (req, res) => {
    try {
      console.log("hello")
      const organizerId = req.params.id;
  
      const events = await Event.find({ organizerId })
        .populate('eventAddress', 'street city state country zipCode')
        .select('eventName eventDescription eventDate ticketPrice eventImages');

      if (!events) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      res.json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch events." });
    }
  },
  

  enrollUserInEvent: async (eventId, attendeeId) => {
    try {
      // Check if the payment transaction is completed
      const payment = await PaymentTransactions.findOne({
        eventId: eventId,
        paymentStatus: "completed",
      });

      if (!payment) {
        throw new Error("Payment not completed.");
      }

      // Create an enrollment record
      const enrollment = new EventAttendees({
        eventId: eventId,
        attendeeId: attendeeId,
        attendanceStatus: "attending",
      });

      await enrollment.save();

      return "Enrollment successful!";
    } catch (error) {
      console.error(error);
      throw new Error("Failed to enroll user.");
    }
  },

  // Add more controller methods as needed
};

export default eventController;
