import Event from '../../models/Event.js'; // Import your Event model
import EventAttendees from '../../models/EventAttendees.js';
import PaymentTransactions from '../../models/PaymentTransactions.js';

const eventController = {
    // GET all events
    postEvent: async (req, res) => {
        try {
          const {
            organizerId,
            eventName,
            eventDescription,
            eventDate,
            ticketPrice,
            eventImage,
          } = req.body;
    
          const newEvent = new Event({
            organizerId,
            eventName,
            eventDescription,
            eventDate,
            ticketPrice,
            eventImage,
          });
    
          await newEvent.save();
    
          return res.status(201).json({ message: 'Event created successfully!' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Failed to create event.' });
        }
    },
   
    // Get all events
    getAllEvents: async (req, res) => {
        try {
          const events = await Event.find().populate('organizerId');
          return res.status(200).json(events);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Failed to fetch events.' });
        }
    },

    // Update event details by ID
  updateEvent: async (req, res) => {
    try {
      const eventId = req.params.id;
      const updatedData = req.body;

      await Event.findByIdAndUpdate(eventId, updatedData);
      return res.status(200).json({ message: 'Event updated successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update event.' });
    }
  },

    // Delete an event by ID
  deleteEvent: async (req, res) => {
    try {
      const eventId = req.params.id;

      await Event.findByIdAndDelete(eventId);
      return res.status(200).json({ message: 'Event deleted successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete event.' });
    }
  },

  enrollUserInEvent : async (eventId, attendeeId) => {
    try {
      // Check if the payment transaction is completed
      const payment = await PaymentTransactions.findOne({
        eventId: eventId,
        paymentStatus: 'completed',
      });
  
      if (!payment) {
        throw new Error('Payment not completed.');
      }
  
      // Create an enrollment record
      const enrollment = new EventAttendees({
        eventId: eventId,
        attendeeId: attendeeId,
        attendanceStatus: 'attending',
      });
  
      await enrollment.save();
  
      return 'Enrollment successful!';
    } catch (error) {
      console.error(error);
      throw new Error('Failed to enroll user.');
    }
  }
  

    // Add more controller methods as needed
};

export default eventController;
