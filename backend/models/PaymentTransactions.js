import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new mongoose.Schema({
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
    paymentDate: {
        type: Date,
    },
    paymentStatus: {
        type: String,
        enum: ['completed', 'pending', 'failed'],
        required: true // Consider whether you want this to be required
    },
});

const PaymentTransactions = mongoose.model('Payment', paymentSchema);

export default PaymentTransactions;
