import mongoose, { Schema } from 'mongoose';

const attendeeSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true, // Remove leading/trailing spaces
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); // Validate with a regular expression
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    profilePicture: {
        type: String,
        
    },
    // Other attendee-specific fields    
});

const Attendee = mongoose.model('Attendee', attendeeSchema);

export default Attendee;
