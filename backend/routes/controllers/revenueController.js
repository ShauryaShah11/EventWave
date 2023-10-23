import EventAttendees from '../../models/EventAttendees.js';
import Organizer from '../../models/Organizer.js';
import Event from '../../models/Event.js';

const revenueController = {
  getRevenueByMonth: async (req, res) => {
    try {
      const twelveMonthsAgo = new Date(); // Start from today
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12); // Go back 12 months

      const revenueByMonth = await EventAttendees.aggregate([
        {
          $match: {
            registrationDate: { $gte: twelveMonthsAgo, $lte: new Date() }, // Filter records for the last 12 months
            attendanceStatus: 'attending', // Consider only attending attendees
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$registrationDate" },
              month: { $month: "$registrationDate" },
            },
            totalRevenue: { $sum: "$totalCost" }, // Sum the revenue for each month
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

      res.json(revenueByMonth);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      res.status(500).json({ error: 'An error occurred while fetching revenue data' });
    }
  },

  getRevenue: async (req, res) => {
    try {
      const revenueData = await EventAttendees.find({
        attendanceStatus: 'attending', // Consider only attending attendees
      });
  
      const totalRevenue = revenueData.reduce((total, attendee) => total + attendee.totalCost, 0);
  
      res.json({ totalRevenue });
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      res.status(500).json({ error: 'An error occurred while fetching revenue data' });
    }
  },

  getRevenueByUserId: async (req, res) => {
    try {
      const userId = req.params.userId; // Extract the userId from the request parameters
  
      // Find the organizer with the given userId
      const organizer = await Organizer.findOne({ userId });
  
      if (!organizer) {
        // Organizer not found
        return res.status(404).json({ error: 'Organizer not found' });
      }
  
      const organizerId = organizer._id;
  
      // Find all events created by the organizer
      const events = await Event.find({ organizerId });
  
      const eventIds = events.map(event => event._id);
  
      // Use the $match stage to filter records for attendees of those events
      const attendees = await EventAttendees.find({ eventId: { $in: eventIds } });
  
      // Calculate the total revenue by summing the total cost of all attendees
      const totalRevenue = attendees.reduce((total, attendee) => total + attendee.totalCost, 0);
  
      res.json({ totalRevenue });
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      res.status(500).json({ error: 'An error occurred while fetching revenue data' });
    }
  },

  getOrganizerRevenueByMonth: async (req, res) => {
    try {
      const userId = req.params.userId; // Extract the userId from the request parameters
  
      // Find the organizer with the given userId
      const organizer = await Organizer.findOne({ userId });
  
      if (!organizer) {
        // Organizer not found
        return res.status(404).json({ error: 'Organizer not found' });
      }
  
      const organizerId = organizer._id;
      const twelveMonthsAgo = new Date(); // Start from today
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12); // Go back 12 months
  
      const revenueByMonth = await EventAttendees.aggregate([
        {
          $match: {
            registrationDate: { $gte: twelveMonthsAgo, $lte: new Date() }, // Filter records for the last 12 months
            attendanceStatus: 'attending', // Consider only attending attendees
          },
        },
        {
          $lookup: {
            from: 'events', // Use the 'events' collection
            localField: 'eventId',
            foreignField: '_id',
            as: 'event',
          },
        },
        {
          $unwind: '$event',
        },
        {
          $match: {
            'event.organizerId': organizerId,
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$registrationDate' },
              month: { $month: '$registrationDate' },
            },
            totalRevenue: { $sum: '$totalCost' }, // Sum the revenue for each month
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
          },
        },
      ]);
  
      res.json(revenueByMonth);
    } catch (error) {
      console.error('Error fetching organizer revenue data:', error);
      res.status(500).json({ error: 'An error occurred while fetching organizer revenue data' });
    }
  }
  
  
  
};

export default revenueController;
