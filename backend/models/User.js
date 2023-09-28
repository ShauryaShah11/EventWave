import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email addresses are unique
        validate: {
            validator: function (v) {
                // You can add a custom email validation regex here
                return /\S+@\S+\.\S+/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address.`,
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['organizer', 'attendee', 'admin'],
        default: 'attendee', // Default role is 'attendee'
        required: true,
    },
    // Other user-specific fields
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
