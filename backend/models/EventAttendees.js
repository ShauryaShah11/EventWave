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
    attendanceStatus: {
        type: String,
        enum: ['attending', 'not_attending', 'pending'],
        required: true,
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentTransactions', // Reference the 'PaymentTransactions' model
    },
});

const EventAttendees = mongoose.model('EventAttendees', eventAttendeesSchema);

export default EventAttendees;
