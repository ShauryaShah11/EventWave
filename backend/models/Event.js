import mongoose, { Schema } from 'mongoose';

const eventSchema = new mongoose.Schema({
    organizerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    eventDescription: String,
    eventDate: {
        type: Date,
        required: true,
    },
    ticketPrice: {
        type: Number,
        min: 0, // Assuming ticket price cannot be negative
        required: true,
    },
    eventImage: String,
    // Other event-specific fields      
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
