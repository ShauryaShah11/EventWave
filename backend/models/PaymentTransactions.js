import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
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
