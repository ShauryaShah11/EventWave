import Event from "../models/Event.js"; // Import your Event model
import Attendee from "../models/Attendee.js"; 
import Organizer from "../models/Organizer.js";
import Address from "../models/Address.js";
import EventAttendees from "../models/EventAttendees.js";
import PaymentTransactions from "../models/PaymentTransactions.js";
import { upload, deleteOldImages } from "../config/multerConfig.js"; // Adjust the path as needed

// Your event controller code here

const eventController = {
  // GET all events
  postEvent: async(req, res) => {
      try {
        const {
          userId,
          eventName,
          eventDescription,
          eventDate,
          ticketPrice,
          ticketQuantity,
          street,
          city,
          state,
          country,
          zipcode,
        } = req.body;

        const images = req.fileUrls;

        const organizer = await Organizer.findOne({ userId: userId });

        const organizerId = organizer._id;
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
          ticketQuantity,
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

  // Update event details by ID
  updateEvent: async (req, res) => {
      try {
        const eventId = req.params.eventId;
        const { eventName, eventDescription, ticketPrice, ticketQuantity, eventDate } = req.body;
        const eventImages = req.fileUrls; // Assuming this is for updating event images

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

        // Update the event data
        const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          {
            eventName,
            eventDescription,
            ticketPrice,
            ticketQuantity,
            eventDate,
            eventImages, // Assuming eventImages are updated here
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

  // Delete an event by ID
  deleteEvent: async (req, res) => {
    try {
      const eventId = req.params.eventId;
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
        .select("eventName eventDescription eventDate ticketPrice ticketQuantity eventImages isFeatured");
      return res.status(200).json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch events." });
    }
  },

  // Get event By Id
  getEventById: async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const event = await Event.findById(eventId).populate("organizerId")
        .populate("eventAddress", "street city state country zipCode")
        .select("eventName eventDescription eventDate ticketPrice ticketQuantity eventImages isFeatured");

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
      const userId = req.params.userId; // Extract the userId from the request parameters
  
      // Find the organizer with the given userId
      const organizer = await Organizer.findOne({ userId });
  
      if (!organizer) {
        // Organizer not found
        return res.status(404).json({ error: 'Organizer not found' });
      }
  
      const organizerId = organizer._id;
      const events = await Event.find({ organizerId }).populate("organizerId")
        .populate("eventAddress", "street city state country zipCode")
        .select("eventName eventDescription eventDate ticketPrice ticketQuantity eventImages isFeatured");

      if (!events) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch events." });
    }
  },

  getFeaturedEvent: async (req, res) => {
    try {      
      const featuredEvents = await Event.find({ isFeatured: true });
  
      return res.json(featuredEvents); // Send the featured events as a JSON response
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve featured events' });
    }
  },  

  enrollUserInEvent: async (req, res) => {
    try {
      const eventId = req.body.eventId;
      const userId = req.body.userId;
      const ticketQuantity = req.body.ticketQuantity;
      const paymentId = req.body.paymentId;

      const attendee = await Attendee.findOne({userId:userId});

      const attendeeId = attendee._id;
  
      const event = await Event.findOne({ _id: eventId });
      if (event.ticketQuantity < ticketQuantity) {
        return res.status(400).json({ success: false, message: "Not enough tickets available." });
      }
  
      event.ticketQuantity = event.ticketQuantity - ticketQuantity;

      await event.save();
      // Create an enrollment record
      const enrollment = new EventAttendees({
        eventId: eventId,
        attendeeId: attendeeId,
        paymentId: paymentId,
        attendanceStatus: "attending",
        ticketQuantity: ticketQuantity,
        totalCost: event.ticketPrice * ticketQuantity,
        registrationDate: new Date(),
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
      const attendee = await Attendee.findOne({userId:userId});
      
      
      const attendedEvents = await EventAttendees.find({ attendeeId: attendee._id })
        .populate({ path: 'eventId' , populate: { path: 'eventAddress' } });

        const eventsWithPaymentStatus = await Promise.all(
          attendedEvents.map(async (attendance) => {
            const event = attendance.eventId;
            const paymentId = attendance.paymentId;
            const payment = await PaymentTransactions.findOne({ _id: paymentId });
            const totalCost = event.ticketPrice * attendance.ticketQuantity;

            return {
              _id: event._id,
              eventName: event.eventName,
              eventDescription: event.eventDescription,
              eventAddress: event.eventAddress,
              eventDate: event.eventDate,
              ticketPrice: event.ticketPrice,
              ticketQuantity: attendance.ticketQuantity,
              totalCost: totalCost,
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
  },


  getAttendeesByEventId: async (req, res) => {
    const eventId = req.params.eventId;
    try {
        const eventAttendees = await EventAttendees.find({ eventId: eventId })
            .populate([
                {
                    path: 'attendeeId',
                    model: Attendee, // Provide the Attendee model
                    select: 'fullName contactNumber dateOfBirth profilePicture'
                },
                {
                  path: 'eventId',
                  model: Event, // Provide the Attendee model
                  select: 'eventName ticketPrice'
                },
                {
                    path: 'paymentId',
                    model: PaymentTransactions, // Provide the Payment model
                    select: 'paymentDate paymentStatus'
                }
            ]);

        return res.json(eventAttendees);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch event attendees' });
    }
  },

  toggleEventFeature: async (req, res) => {
    const eventId = req.params.eventId;
    const { isFeatured } = req.body;

    try{
      const event = await Event.findById(eventId);

      if(!event){
        return res.status(404).json({ error: 'Event not found' });
      }

      event.isFeatured = isFeatured

      await event.save();

      return res.status(200).json({ message: 'Event feature status updated successfully' });
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update event feature status' });
    }
  },

  searchEvents: async (req, res) => {
    try {
      const { query } = req.query; // Extract the 'query' parameter from the request query
  
      if (!query) {
        return res.status(400).json({ message: 'Query parameter is required for searching.' });
      }
  
      // Use a regular expression to perform a case-insensitive search by event name
      const events = await Event.find({ eventName: { $regex: new RegExp(query, 'i') } });
  
      if (events.length === 0) {
        return res.status(404).json({ message: 'No events found for the given query.' });
      }
  
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getEventCountByOrganizerId: async (req, res) => {
    try {
      const userId = req.params.userId; // Extract the organizerId from the request parameters
      const organizer = await Organizer.findOne({ userId: userId });

      const organizerId = organizer._id;
  
      // Use the `countDocuments` method to count events with the given organizerId
      const eventCount = await Event.countDocuments({ organizerId });
  
      res.json({ count: eventCount });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching event count' });
    }
  },

  getEventsAttendedByAttendeesOfOrganizer: async (req, res) => {
    try {
      const userId = req.params.userId; // Extract the userId from the request parameters
  
      // Find the organizer with the given userId
      const organizer = await Organizer.findOne({ userId });
  
      if (!organizer) {
        // Organizer not found
        return res.status(404).json({ error: 'Organizer not found' });
      }
  
      const organizerId = organizer._id;
  
      // Use the $match stage to filter records for events created by the organizer
      const events = await Event.find({ organizerId });
  
      const eventIds = events.map(event => event._id);
  
      // Use the $match stage to filter records for attendees of those events
      const eventsAttendedCount = await EventAttendees.aggregate([
        {
          $match: {
            eventId: { $in: eventIds }, // Match based on eventIds
          },
        },
        {
          $group: {
            _id: '$eventId',
            numberOfAttendees: { $sum: 1 }, // Sum the number of attendees for each event
          },
        },
      ]);
  
      if (eventsAttendedCount.length > 0) {
        const totalAttendees = eventsAttendedCount.reduce((total, event) => total + event.numberOfAttendees, 0);
  
        // Return the total number of attendees for events created by the organizer
        res.json({ count: totalAttendees });
      } else {
        // No attendees for events created by the organizer
        res.json({ count: 0 });
      }
    } catch (error) {
      console.error('Error fetching events attended count:', error);
      res.status(500).json({ error: 'An error occurred while fetching events attended count' });
    }
  }
  
  

};

export default eventController;
