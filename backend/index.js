// Import required packages
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises'; // Import the 'fs' module with promises support

// Import your routes and data models here
import userRoutes from './routes/api/userRoutes.js';
import eventRoutes from './routes/api/eventRoutes.js';
import organizerRoutes from './routes/api/organizerRoutes.js';
import eventFeedbackRoutes from './routes/api/eventFeedbackRoutes.js';
import paymentRoutes from './routes/api/paymentRoutes.js';
import passwordResetRoutes from './routes/api/passwordResetRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;
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

// Serve images from the specified directory
const imagesDirectory = join(__dirname, 'uploads');
app.use('/images', express.static(imagesDirectory));

// Implement your routes
app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/organizer', organizerRoutes);
app.use('/event-feedback', eventFeedbackRoutes);
app.use('/payments', paymentRoutes);
app.use('/password-reset', passwordResetRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Event Management System API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
