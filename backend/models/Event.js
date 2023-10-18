import mongoose, { Schema } from 'mongoose';

const eventSchema = new mongoose.Schema({
    organizerId: {
        type: Schema.Types.ObjectId,
        ref: 'Organizer',
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
    ticketQuantity: {
        type: Number,
        min: 0, // Assuming ticket quantity cannot be negative
        required: true,
    },
    eventImages: [
        {
            type: String,
            // You can add validation for image uploads here
        },
    ],
    eventAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address', // Reference the 'Address' model
        required: true,
    },
    isFeatured: {
        type: Boolean, // New field for indicating if the event is featured
        default: false, // Default to not featured
    },
    // Add any other event-specific fields here
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
