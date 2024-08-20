import express from 'express';
import dbConnectionMiddleware from './middleware/dbConnectionMiddleware';
import authRoutes from './routes/authRoutes';
import appAdminRoutes from './routes/appAdminRoutes';
import memberRoutes from './routes/memberRoutes';
import tenantAdminRoutes from './routes/tenantAdminRoutes';

const app = express();

// Middleware
app.use(dbConnectionMiddleware);
app.use(express.json());

//Routes
app.use('/auth', authRoutes);
app.use('/appAdmin', appAdminRoutes);
app.use('/member', memberRoutes);
app.use('/tenantAdmin', tenantAdminRoutes);

export default app;