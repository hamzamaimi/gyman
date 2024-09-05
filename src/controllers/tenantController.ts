import { Request, Response } from "express";
import connectDB from "../config/db";
import { DB_CONNECTION_ERROR } from "../constants/errorsConstants";
import { TENANT_MODEL_NAME } from "../constants/dbConstants";
import { TenantSchema } from "../models/tenantModel";

export const getBase64Logo = async (req: Request, res: Response) => {
    try{
        const dbConnection = await connectDB('administration');
        if(dbConnection){
            const tenantModel = dbConnection.model(TENANT_MODEL_NAME, TenantSchema);
            const tenant = await tenantModel.findOne({ name: res.locals.tenant}).exec();
            if(tenant){
                res.status(200).send({"base64logo" : tenant.base64Logo});
                return;
            }else{
                res.status(404);
                return;
            }
        }
    }catch (err){
        console.error(DB_CONNECTION_ERROR);
        throw new Error(DB_CONNECTION_ERROR);
    }
    res.status(500);
}