import mongoose, { Schema } from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    // You can add additional fields for latitude and longitude if needed
});

const Address = mongoose.model('Address', addressSchema);

export default Address;
