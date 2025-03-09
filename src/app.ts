import express from 'express';
import dbConnectionMiddleware from './middleware/dbConnectionMiddleware';
import authRoutes from './routes/authRoutes';
import appAdminRoutes from './routes/appAdminRoutes';
import memberRoutes from './routes/memberRoutes';
import tenantRoutes from './routes/tenantRoutes';
import tenantAdminRoutes from './routes/tenantAdminRoutes';
import cookiesMiddleware from './middleware/processCookiesMiddleware';
import tenantMiddleware from './middleware/tenantMiddleware';
import cors from 'cors';

const app = express();

// Middleware
app.use(tenantMiddleware);
app.use(dbConnectionMiddleware);
app.use(express.json());
app.use(cookiesMiddleware);

//Routes
/**
 * @todo
 * set the CORS for the production environment
 */
app.use(cors({
    origin: 'http://192.168.1.18:5173',    
    methods: 'GET,POST,PUT,DELETE',   // Specify allowed HTTP methods,
    credentials: true //Allow credentials (cookies) to be sent
}));
app.use('/api/auth', authRoutes);
app.use('/api/appAdmin', appAdminRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/tenantAdmin', tenantAdminRoutes);
app.use('/api/tenant', tenantRoutes);

export default app;
