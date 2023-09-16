import mongoose, { Schema } from 'mongoose';

const eventAttendeesSchema = new mongoose.Schema({
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
    attendanceStatus: {
        type: String,
        enum: ['attending', 'not_attending', 'pending'],
        required: true,
    },
});

const EventAttendees = mongoose.model('EventAttendees', eventAttendeesSchema);

export default EventAttendees;
