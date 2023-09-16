// Import required packages
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
// Import your routes and data models here
// import adminRoutes from './routes/api/adminRoutes.js';
import userRoutes from './routes/api/userRoutes.js';
import eventRoutes from './routes/api/eventRoutes.js';
import organizerRoutes from './routes/api/organizerRoutes.js';
import eventFeedbackRoutes from './routes/api/eventFeedbackRoutes.js';
import paymentRoutes from './routes/api/paymentRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;
const database_name = process.env.DATABASE;

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: database_name,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Implement your routes
app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/organizer', organizerRoutes);
app.use('/event-feedback', eventFeedbackRoutes);
app.use('/payments', paymentRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Event Management System API');
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
