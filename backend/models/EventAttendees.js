import mongoose, { Schema } from 'mongoose';

const eventAttendeesSchema = new mongoose.Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event', // Reference the 'Event' model
        required: true,
    },
    attendeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Attendee', // Reference the 'Attendee' model
        required: true,
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentTransactions', // Reference the 'PaymentTransactions' model
    },
    attendanceStatus: {
        type: String,
        enum: ['attending', 'not_attending', 'pending'],
        required: true,
    },
    ticketQuantity: {
        type: Number,
        default: 1, // Default to 1 ticket
        min: 1, // Assuming the minimum quantity is 1
    },
    totalCost: {
        type: Number, // Store the total cost of the event for this attendee
    },
    registrationDate: {
        type: Date, // Add a new field for registration date
    }
});

const EventAttendees = mongoose.model('EventAttendees', eventAttendeesSchema);

export default EventAttendees;
