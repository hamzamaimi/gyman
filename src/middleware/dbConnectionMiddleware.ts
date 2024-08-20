import { Request, Response, NextFunction } from 'express';
import connectDB from '../config/db';
import {tenantsDictionary} from '../constants/tenantCosntants';

const dbMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Get domain, remove port if present and remove 'www.' if present
    const host: string = req.headers.host || '';
    const baseHost = host.split(':')[0].replace(/^www\./, '');

    // Define the tenant according to the hostname
    if (baseHost && tenantsDictionary[baseHost]) {
        res.locals.tenant = tenantsDictionary[baseHost];
        try {
            await connectDB(res.locals.tenant);
            console.log(`Connected to database for tenant: ${res.locals.tenant}`);
        } catch (err) {
            console.error(`Error connecting to database for tenant ${res.locals.tenant}:`, err);
            res.status(500).send('Database connection error');
            return;
        }
    } else {
        res.locals.tenant = 'unknown';
    }
    
    next(); // Go to the next middleware
};

export default dbMiddleware;