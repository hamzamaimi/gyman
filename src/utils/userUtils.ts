import { JWT } from "../constants/cookiesConstants"
import { QUERY_EXECUTION_ERROR, ROLE_NOT_FOUND } from "../constants/errorsConstants";
import { APP_ADMIN_ROLE, MEMBER_ROLE, TENANT_ADMIN_ROLE } from "../constants/userConstants";
import { IUser } from "../models/userModel";
import * as dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Connection } from "mongoose";
import { AppAdminSchema } from "../models/appAdminModel";
import { TenantAdminSchema } from "../models/tenantAdminModel";
import { MemberSchema } from "../models/memberModel";
import { APP_ADMIN_MODEL_NAME, TENANT_ADMIN_MODEL_NAME, MEMBER_MODEL_NAME } from "../constants/dbConstants";

dotenv.config();

/**
 * @param cookies
 * Contains the application cookies, make sure that the jwtToken is in there.
 * @todo
 * put the secret in the .env file
 */
export const getUserByToken = async (cookies: Record<string, any>, dbConnection: Connection): Promise<IUser | null>   => {
    const jwtToken = cookies[JWT];
    const jwtSecret = process.env.ACCESS_TOKEN_SECRET || '';

    // Verify and decode the token
    const decoded = jwt.verify(jwtToken, jwtSecret);
    const payload = decoded as JwtPayload;

    // Extract user ID from the decoded token
    const userEmail = payload.email;

    const user: IUser | null = await findUserByEmail(dbConnection, userEmail);
    return user;
}

export const getRoleForNewUser = (currentUserRole : string) : string => {
    if(currentUserRole == APP_ADMIN_ROLE){
        return TENANT_ADMIN_ROLE;
    }
    if(currentUserRole == TENANT_ADMIN_ROLE){
        return MEMBER_ROLE;
    }
    throw new Error(ROLE_NOT_FOUND);
}

/**
 * @param dbConnection
 * Database connection.
 * @param email 
 * The email of the user to find.
 * @returns 
 * A user object if the user exists or null.
 */
export async function findUserByEmail(dbConnection: Connection, email: String): Promise<IUser | null> {
    const { appAdminModel, tenantAdminModel, memberModel } = getUserModels(dbConnection);
    let user: IUser|null = null;
    try {
        user = await appAdminModel.findOne({ email: email }).exec();
        if (user) return user;
        user = await tenantAdminModel.findOne({ email: email }).exec();
        if (user) return user;
        user = await memberModel.findOne({ email: email }).exec();
    } catch (err) {
        console.error(QUERY_EXECUTION_ERROR, err);
        throw new Error(QUERY_EXECUTION_ERROR + " " + err);
    }
    return user;
}

function getUserModels(dbConnection: Connection){
    const appAdminModel = dbConnection.model(APP_ADMIN_MODEL_NAME, AppAdminSchema);
    const tenantAdminModel = dbConnection.model(TENANT_ADMIN_MODEL_NAME, TenantAdminSchema);
    const memberModel = dbConnection.model(MEMBER_MODEL_NAME, MemberSchema);
    return { appAdminModel, tenantAdminModel, memberModel };
}