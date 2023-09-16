import mongoose, { Schema } from 'mongoose';

const paymentSchema = new mongoose.Schema({
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
    paymentDate: Date,
    paymentStatus: {
        type: String,
        // required: true,
        enum: ['completed', 'pending', 'failed'], // Enum values for payment status
    },
});

const PaymentTransactions = mongoose.model('Payment', paymentSchema);

export default PaymentTransactions;
