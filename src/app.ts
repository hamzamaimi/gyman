import express from 'express';
import dbConnectionMiddleware from './middleware/dbConnectionMiddleware';
import authRoutes from './routes/authRoutes';
import appAdminRoutes from './routes/appAdminRoutes';
import memberRoutes from './routes/memberRoutes';
import tenantRoutes from './routes/tenantRoutes';
import tenantAdminRoutes from './routes/tenantAdminRoutes';
import cookiesMiddleware from './middleware/processCookiesMiddleware';
import tenantMiddleware from './middleware/tenantMiddleware';

const app = express();

// Middleware
app.use(tenantMiddleware);
app.use(dbConnectionMiddleware);
app.use(express.json());
app.use(cookiesMiddleware);

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/appAdmin', appAdminRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/tenantAdmin', tenantAdminRoutes);
app.use('/api/tenant', tenantRoutes);

export default app;