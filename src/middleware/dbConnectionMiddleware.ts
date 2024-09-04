import { Request, Response, NextFunction } from 'express';
import connectDB from '../config/db';
import {TENANTS_DICTIONARY} from '../constants/tenantConstants';
import initAppAdminUser from '../scripts/initAppAdminUser';
import { DB_CONNECTION_ERROR } from '../constants/errorsConstants';

/**
 * @param res.locals.tenant
 * Contains the tenant the user are trying to connect. 
 * This param is evalued in the tenantMiddleware functions.
 * @description
 * Connects to the database specified in the res.locals.tenant
 */
const dbMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await connectDB(res.locals.tenant).then((result) => {
            res.locals.dataBaseConnection = result;
            if(result){
                initAppAdminUser(result);
            }else{
                console.error(DB_CONNECTION_ERROR);
                throw new Error(DB_CONNECTION_ERROR);
            }
        })
    }catch (err) {
        console.error(`Error connecting to database for tenant ${res.locals.tenant}:`, err);
        res.status(500).send('Database connection error');
        return;
    }       
    
    next(); // Go to the next middleware
};

export default dbMiddleware;