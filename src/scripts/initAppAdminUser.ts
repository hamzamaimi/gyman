import * as dotenv from 'dotenv';
dotenv.config();

import { AppAdminSchema } from '../models/appAdminModel';
import { APP_ADMIN_ROLE } from '../constants/userConstants';
import { ADMIN_USER_CREATED } from '../constants/sucessConstants';
import { USER_CREATION_ERROR } from '../constants/errorsConstants';
import { Connection } from 'mongoose';
import { APP_ADMIN_MODEL_NAME } from '../constants/dbConstants';

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const initAppAdminUser = async (dbConnection: Connection) => {
    try{
        const appAdminModel = dbConnection.model(APP_ADMIN_MODEL_NAME, AppAdminSchema);
        const existingAdmin = await appAdminModel.findOne({ email: adminEmail }).exec();
        if (existingAdmin){ 
            return; 
        }
        
        const appAdminUser = new appAdminModel({
            firstName: 'admin',
            lastName: 'user',
            email: adminEmail,
            password: adminPassword,
            role: APP_ADMIN_ROLE
        })

        await appAdminUser.save();
        console.log(ADMIN_USER_CREATED);
    }catch(err) {
        console.log(USER_CREATION_ERROR, err);
    }
} 

export default initAppAdminUser;