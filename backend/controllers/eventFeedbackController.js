import EventFeedback from '../models/EventFeedback.js'; // Import your EventFeedback model
import Attendee from '../models/Attendee.js'; // Import your Attend

const eventFeedbackController = {
  async submitFeedback(req, res) {
    try {
      console.log(req.body);

      const { eventId, userId, rating, comment } = req.body;

      const attendee = await Attendee.findOne({userId:userId});

      const attendeeId = attendee._id;
      const newFeedback = new EventFeedback({
        eventId,
        attendeeId,
        rating,
        comment,
        feedbackTime: new Date()
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
      const eventId = req.params.eventId; // Event ID to fetch feedback for

      const feedback = await EventFeedback.find({ eventId })
        .populate('attendeeId', 'fullName')
        .select('comment rating feedbackTime');

      return res.status(200).json(feedback);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to get event feedback.' });
    }
  },

  // Add more controller functions for updating and deleting feedback as needed
};

export default eventFeedbackController;
