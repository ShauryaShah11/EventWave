import mongoose, { Schema } from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Events',
        required: true,
    },
    attendeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Attendees',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: String,
});

const EventFeedback = mongoose.model('EventFeedback', feedbackSchema);

export default EventFeedback;
