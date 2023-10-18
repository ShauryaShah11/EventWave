import mongoose, { Schema } from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Events',
        required: true,
    },
    attendeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Attendee',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: String,
    feedbackTime: {
        type: Date,
        default: Date.now, // Set to the current date and time when not provided
    },
});

const EventFeedback = mongoose.model('EventFeedback', feedbackSchema);

export default EventFeedback;
