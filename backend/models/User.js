import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
       // unique: true, // Ensures usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email addresses are unique
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['organizer', 'attendee', 'admin'],
        // default: 'attendee', // Default role is 'attendee'
        required: true,
    },
    // Other user-specific fields
});

const User = mongoose.model('User', userSchema);

export default User;
