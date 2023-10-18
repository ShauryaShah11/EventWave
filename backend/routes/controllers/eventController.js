import Event from "../../models/Event.js"; // Import your Event model
import Attendee from "../../models/Attendee.js"; 
import Organizer from "../../models/Organizer.js";
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

        const images = req.files.map((file) => file.filename);

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
  ],

  // Update event details by ID
  updateEvent: [
    upload.array("eventImages", 5),
    async (req, res) => {
      try {
        const eventId = req.params.eventId;
        const { eventName, eventDescription, ticketPrice, ticketQuantity, eventDate } = req.body;
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
            ticketQuantity,
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
      const organizerId = req.params.organizerId;

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

      const attendee = await Attendee.findOne({userId:userId});

      const attendeeId = attendee._id;
  
      const event = await Event.findOne({ _id: eventId });
      if (event.ticketQuantity < ticketQuantity) {
        return res.status(400).json({ success: false, message: "Not enough tickets available." });
      }
  
      // Check if the payment transaction is completed
      const payment = await PaymentTransactions.findOne({
        eventId: eventId,
        paymentStatus: "completed",
      });
  
      if (!payment) {
        return res.status(400).json({ success: false, message: "Payment not completed." });
      }
  
      event.ticketQuantity = event.ticketQuantity - ticketQuantity;

      await event.save();
      // Create an enrollment record
      const enrollment = new EventAttendees({
        eventId: eventId,
        attendeeId: attendeeId,
        paymentId: payment._id,
        attendanceStatus: "attending",
        ticketQuantity: ticketQuantity,
        totalCost: event.ticketPrice * ticketQuantity
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
  }
  

};

export default eventController;
