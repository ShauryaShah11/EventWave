import EventAttendees from '../../models/EventAttendees.js';

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
};

export default revenueController;
