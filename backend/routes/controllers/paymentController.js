import eventController  from './eventController.js'; // Import the appropriate path
import PaymentTransactions from '../../models/PaymentTransactions.js';
// paymentController.js
const paymentController = {
  createPaymentTransaction: async (req, res) => {
    try {
      // Extract relevant data from the request body sent by the frontend
      const { eventId, userId, amount, cardDetails } = req.body;
  
      // Create a new payment transaction record
      
      const paymentTransaction = new PaymentTransactions({
        eventId, // Event ID
        attendeeId: userId, // User ID
        paymentDate: new Date(),
        paymentStatus: 'completed', // You can set this to 'completed' if the payment was successful
      });
  
      // Save the payment transaction to your database
      const savedPayment = await paymentTransaction.save();
  
      // Respond to the frontend with a success message
      res.json({ success: true, message: 'Payment transaction created successfully' });
    } catch (error) {
      console.error('Error creating payment transaction:', error);
      // Respond with an error message
      res.status(500).json({ success: false, message: 'Error creating payment transaction' });
    }
  
  },
  
    updatePaymentStatus: async (req, res) => {
      // Update the payment status based on request data
      // Handle error cases and send appropriate responses
    },
  
    // Other payment-related functions...
  };
  
  export default paymentController;
  