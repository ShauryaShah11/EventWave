import EventFeedback from '../../models/EventFeedback.js'; // Import your EventFeedback model

const eventFeedbackController = {
  async submitFeedback(req, res) {
    try {
      const { eventId, attendeeId,rating, comment } = req.body;

      const newFeedback = new EventFeedback({
        eventId,
        attendeeId,
        rating,
        comment,
      });

      await newFeedback.save();

      return res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to submit feedback.' });
    }
  },

  async getEventFeedback(req, res) {
    try {
      const eventId = req.params.id; // Event ID to fetch feedback for

      const feedback = await EventFeedback.find({ eventId });

      return res.status(200).json(feedback);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to get event feedback.' });
    }
  },

  // Add more controller functions for updating and deleting feedback as needed
};

export default eventFeedbackController;
