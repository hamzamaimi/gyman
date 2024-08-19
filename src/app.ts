import express from 'express';
import path from 'path';
import dbConnectionMiddleware from './middleware/dbConnectionMiddleware';

const dotenv = require('dotenv');
//Load .env configurations
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT;

// Middleware
app.use(dbConnectionMiddleware);
app.use(express.json());


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});