import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});