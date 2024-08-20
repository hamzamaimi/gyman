import express from 'express';
import dbConnectionMiddleware from './middleware/dbConnectionMiddleware';

const app = express();

// Middleware
app.use(dbConnectionMiddleware);
app.use(express.json());

export default app;