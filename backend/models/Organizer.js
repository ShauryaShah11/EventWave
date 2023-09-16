import mongoose, { Schema } from 'mongoose';

const organizerSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    companyName: String,
    companyAddress: String,
    contactNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Custom validation logic for contact number
                // For example, you can use regex to validate the format
                return /^[0-9]{10}$/.test(value);
            },
            message: 'Invalid contact number',
        },
    },
    profilePicture: String,
    // Other organizer-specific fields
});

const Organizer = mongoose.model('Organizer', organizerSchema);

export default Organizer;
