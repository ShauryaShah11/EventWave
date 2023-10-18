import EventFeedback from '../../models/EventFeedback.js'; // Import your EventFeedback model
import PaymentTransactions from '../../models/PaymentTransactions.js';
import EventAttendees from '../../models/EventAttendees.js';

const revenueController = {
  

    async getRevenueByMonth(req, res) {
  try {
    const revenueData = await EventAttendees.aggregate([
      {
        $addFields: {
          convertedPaymentId: { $toObjectId: "$paymentId" }
        }
      },
      {
        $lookup: {
          from: 'PaymentTransactions',
          localField: 'convertedPaymentId',
          foreignField: '_id',
          as: 'paymentInfo',
        },
      },
      { $unwind: '$paymentInfo' },
      {
        $match: {
          attendanceStatus: 'attending',
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$paymentInfo.paymentDate' } },
          totalRevenue: { $sum: '$totalCost' },
        },
      },
    ]);

    res.json(revenueData);
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    res.status(500).json({ error: 'An error occurred while fetching revenue data' });
  }
}

        
      
      
      

  // Add more controller functions for updating and deleting feedback as needed
};

export default revenueController;
