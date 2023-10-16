import Event from "../../models/Event.js"; // Import your Event model
import Address from "../../models/Address.js";
import EventAttendees from "../../models/EventAttendees.js";
import PaymentTransactions from "../../models/PaymentTransactions.js";
import { upload, deleteOldImages } from "../../config/multerConfig.js"; // Adjust the path as needed

// Your event controller code here

const eventController = {
  // GET all events
  postEvent: [
    upload.array("eventImages", 5),
    async (req, res) => {
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
  updateEvent: [
    upload.array("eventImages", 5),
    async (req, res) => {
      try {
        const eventId = req.params.id;
        const { eventName, eventDescription, ticketPrice, eventDate } = req.body;
        const eventImages = req.files; // Assuming this is for updating event images

        // Parse the address string into an object
        const address = JSON.parse(req.body.address);

        const addressId = address._id; // You've already extracted it

        // Update the address using its ID
        const updatedAddress = await Address.findByIdAndUpdate(
          addressId,
          address,
        );

        if (!updatedAddress) {
          return res.status(500).json({ error: "Failed to update address" });
        }
        const oldEvent = await Event.findById(eventId);

        let images;
        if (eventImages && eventImages.length > 0) {
          // Delete old images associated with the event (assuming you have a function for this)
          await deleteOldImages(oldEvent.eventImages);

          // Save the new images
          images = req.files.map((file) => file.filename);

        }
        // Update the event data
        const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          {
            eventName,
            eventDescription,
            ticketPrice,
            eventDate,
            eventImages: images, // Assuming eventImages are updated here
          },
          { new: true }, // To return the updated event
        );

        if (!updatedEvent) {
          return res.status(500).json({ error: "Failed to update event" });
        }

        return res
          .status(200)
          .json({ message: "Event updated successfully", updatedEvent });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update event" });
      }
    },
  ],

  // Delete an event by ID
  deleteEvent: async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Event.findById(eventId);
      const addressId = event.eventAddress;
      const address = await Address.findByIdAndDelete(addressId);

      if(!address) {
        return res.status(404).json({ error: "Address not Deleted." });
      }
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
      const events = await Event.find().populate("organizerId")
        .populate("eventAddress", "street city state country zipCode")
        .select("eventName eventDescription eventDate ticketPrice eventImages");
      return res.status(200).json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch events." });
    }
  },

  // Get event By Id
  getEventById: async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Event.findById(eventId).populate("organizerId")
        .populate("eventAddress", "street city state country zipCode")
        .select("eventName eventDescription eventDate ticketPrice eventImages");

      if (!event) {
        return res.status(404).json({ error: "Event Not Found." });
      }

      return res.status(200).json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to Fech event" });
    }
  },

  getEventByOrganizerId: async (req, res) => {
    try {
      const organizerId = req.params.id;

      const events = await Event.find({ organizerId }).populate("organizerId")
        .populate("eventAddress", "street city state country zipCode")
        .select("eventName eventDescription eventDate ticketPrice eventImages");

      if (!events) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch events." });
    }
  },

  enrollUserInEvent: async (req, res) => {
    try {
      const eventId = req.body.eventId;
      const attendeeId = req.body.userId;
  
      // Check if the payment transaction is completed
      const payment = await PaymentTransactions.findOne({
        eventId: eventId,
        paymentStatus: "completed",
      });
  
      if (!payment) {
        return res.status(400).json({ success: false, message: "Payment not completed." });
      }
  
      // Create an enrollment record
      const enrollment = new EventAttendees({
        eventId: eventId,
        attendeeId: attendeeId,
        attendanceStatus: "attending",
        paymentId: payment._id
      });
  
      await enrollment.save();
  
      return res.json({ success: true, message: "Enrollment successful!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to enroll user." });
    }
  },

  getEventsAttendedByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const attendedEvents = await EventAttendees.find({ attendeeId: userId })
        .populate({ path: 'eventId' });

        const eventsWithPaymentStatus = await Promise.all(
          attendedEvents.map(async (attendance) => {
            const event = attendance.eventId;
            const paymentId = attendance.paymentId;
            const payment = await PaymentTransactions.findOne({ _id: paymentId });

            return {
              _id: event._id,
              eventName: event.eventName,
              eventDescription: event.eventDescription,
              eventDate: event.eventDate,
              ticketPrice: event.ticketPrice,
              eventImages: event.eventImages,
              eventAddress: event.eventAddress,
              paymentStatus: payment ? payment.paymentStatus : 'Not paid',
            };
          })
        );
        

      return res.json(eventsWithPaymentStatus);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve events attended by the user' });
    }
  }
  

  // Add more controller methods as needed
};

export default eventController;
