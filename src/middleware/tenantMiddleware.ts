import { Response, Request, NextFunction } from "express";
import connectDB from "../config/db";
import { DB_CONNECTION_ERROR } from "../constants/errorsConstants";
import { TENANTS_DICTIONARY } from "../constants/tenantConstants";
import { TENANT_MODEL_NAME } from "../constants/dbConstants";
import { TenantSchema } from "../models/tenantModel";
import { Connection } from "mongoose";

/**
 * @description
 * Loop through the TENANTS_DICTIONARY and create tenant documents if the collection contains no documents.
 */
const initializeTenantsCollection = async (dbConnection: Connection) => {
    const tenantModel = dbConnection.model(TENANT_MODEL_NAME, TenantSchema);
    try{
        const documents = await tenantModel.findOne().exec();
        if (!documents) {
            const tenants = Object.entries(TENANTS_DICTIONARY).map(([domain, name]) => ({
                domain,
                name,
            }));
            tenantModel.insertMany(tenants);
            console.log('Tenants have been initialized in the database.');
        }
    }catch(err){
        console.error(err);
    }
}
/**
 * @description
 * Get the tenant from the domain, remove port if present and remove 'www.' if present
 */
const identifyTenant = async (dbConnection: Connection, req: Request, res: Response) => {
    const host = req.headers.host?.split(':')[0].replace(/^www\./, '');
    const tenantModel = dbConnection.model(TENANT_MODEL_NAME, TenantSchema);

    if (host) {
      try {
        const tenant = await tenantModel.findOne({ domain: host }).exec();
        if (tenant) {
          res.locals.tenant = tenant.name;
          console.log(`Tenant identified: ${tenant.name}`);
        } else {
          res.locals.tenant = 'unknown';
          console.log('Unknown tenant');
        }
      } catch (error) {
        console.error('Error fetching tenant:', error);
        res.locals.tenant = 'unknown';
      }
    }
  
}

const tenantMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await connectDB('administration').then((dbConnection) => {
            if(dbConnection){
                initializeTenantsCollection(dbConnection);
                identifyTenant(dbConnection, req, res);
            }
        })
    }catch (err){
        console.error(DB_CONNECTION_ERROR);
        throw new Error(DB_CONNECTION_ERROR);
    }
    next();
}

export default tenantMiddleware;
