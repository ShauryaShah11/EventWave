import mongoose, { Schema } from 'mongoose';

const ticketSchema = new mongoose.Schema({
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentTransactions',
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
});

const Tickets = mongoose.model('Tickets', ticketSchema);

export default Tickets;
