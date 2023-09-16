import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import eventController  from './eventController.js'; // Import the appropriate path

// paymentController.js
const paymentController = {
  createPaymentTransaction: async (req, res) => {
    try {
      const { ticketId, amount, paymentStatus } = req.body;

      // Check if the payment is completed
      if (paymentStatus !== 'completed') {
        return res.status(400).json({ error: 'Payment is not completed.' });
      }

      // Find the ticket
      const ticket = await Tickets.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found.' });
      }

      // Create a new payment transaction
      const newPayment = new PaymentTransactions({
        ticketId,
        amount,
        paymentDate: new Date(),
        paymentStatus,
      });
      await newPayment.save();

      // Enroll the user in the event
      const enrollmentMessage = await eventController.enrollUserInEvent(ticket.eventId, ticket.attendeeId, ticketId);

      return res.status(201).json({ message: 'Payment transaction created and user enrolled.', enrollmentMessage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create payment transaction.' });
    }
  },
  
    updatePaymentStatus: async (req, res) => {
      // Update the payment status based on request data
      // Handle error cases and send appropriate responses
    },
  
    // Other payment-related functions...
  };
  
  export default paymentController;
  