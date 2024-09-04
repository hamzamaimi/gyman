import { JWT } from "../constants/cookiesConstants"
import { QUERY_EXECUTION_ERROR, RESET_PASSWORD_ALREADY_SENT, RESET_PASSWORD_ERROR, ROLE_NOT_FOUND, USER_CREATION_ERROR } from "../constants/errorsConstants";
import { APP_ADMIN_ROLE, MEMBER_ROLE, TENANT_ADMIN_ROLE } from "../constants/userConstants";
import { IUser, UserDocument } from "../models/userModel";
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Connection } from "mongoose";
import { AppAdminSchema } from "../models/appAdminModel";
import { TenantAdminSchema } from "../models/tenantAdminModel";
import { MemberSchema } from "../models/memberModel";
import { APP_ADMIN_MODEL_NAME, TENANT_ADMIN_MODEL_NAME, MEMBER_MODEL_NAME } from "../constants/dbConstants";
import { sendBlockedAccountEmail, sendResetPasswordEmail } from "./sendEmailUtills";
import { Response } from "express";
import { generateRandomPassword } from "./authenticationUtils";
import { RESET_PASSWORD_SUCCESSFUL } from "../constants/sucessConstants";

dotenv.config();

/**
 * @param cookies
 * Contains the application cookies, make sure that the jwtToken is in there.
 */
export const getUserByToken = async (cookies: Record<string, any>, dbConnection: Connection): Promise<IUser | null>   => {
    const jwtToken = cookies[JWT];
    const jwtSecret = process.env.ACCESS_TOKEN_SECRET || '';

    // Verify and decode the token
    const decoded = jwt.verify(jwtToken, jwtSecret);
    const payload = decoded as JwtPayload;

    // Extract user's email from the decoded token
    const userEmail = payload.email;

    const user: IUser | null = await getUserByEmail(dbConnection, userEmail);
    return user;
}

/**
 * @param dbConnection
 * Database connection.
 * @param email 
 * The email of the user to find.
 * @returns 
 * A user object if the user exists or null.
 */
export async function getUserByEmail(dbConnection: Connection, email: String): Promise<IUser | null> {
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
/**
 * @returns 
 * All the user models.
 */
export const getUserModels = (dbConnection: Connection) => {
    const appAdminModel = dbConnection.model(APP_ADMIN_MODEL_NAME, AppAdminSchema);
    const tenantAdminModel = dbConnection.model(TENANT_ADMIN_MODEL_NAME, TenantAdminSchema);
    const memberModel = dbConnection.model(MEMBER_MODEL_NAME, MemberSchema);
    return { appAdminModel, tenantAdminModel, memberModel };
}

export const createNewUser = async (name: string, lastname: string, email: string, tenant: string,
    roleForNewUser: string, hashedPassword: string, dbConnection: Connection): Promise<UserDocument> => {
    const { appAdminModel, tenantAdminModel, memberModel } = getUserModels(dbConnection);
    
    try{
        let user;
        switch(roleForNewUser){
            case TENANT_ADMIN_ROLE:
                user = new tenantAdminModel({firstName: name, lastName: lastname, email: email,
                    tenant: tenant, role: roleForNewUser, password: hashedPassword, blocked: false})
                await user.save();
                break;  
            case MEMBER_ROLE:
                user = new memberModel({ firstName: name, lastName: lastname, email: email,
                    tenant: tenant, role: roleForNewUser, password: hashedPassword})
                await user.save();
                break;
            default:
                throw new Error(ROLE_NOT_FOUND);
        }
        return user;
    }catch(err){
        console.log(err);
        throw new Error(`${USER_CREATION_ERROR}: ${err}`);
    }
}

export const increaseWrongAttemptsField = async (user: IUser) => {
    try {
        const wrongAttempts: number = user.wrongAttempts + 1;
        user.wrongAttempts = wrongAttempts;
        await user.save(); 
    } catch (err) {
        console.error(`${QUERY_EXECUTION_ERROR} \n ${err}`);
        throw new Error(`${QUERY_EXECUTION_ERROR} \n ${err}`);
    }
}

export const blockAccountAndSendEmail = async (user: IUser, dbConnection: Connection, res: Response) => {
    try{
        user.blocked = true;
        await user.save();
        sendBlockedAccountEmail(user, res);
    }catch(err) {
        console.error(`${QUERY_EXECUTION_ERROR} \n ${err}`);
        throw new Error(`${QUERY_EXECUTION_ERROR} \n ${err}`);
    }
}

export const activateAccount = async (user: IUser) => {
    user.isAccountActive = true;
    await user.save()
}

export const resetWrongAttemptsField = async (user: IUser) => {
    try{
        user.wrongAttempts = 0;
        await user.save();
    } catch (err) {
        console.error(`${QUERY_EXECUTION_ERROR} \n ${err}`);
        throw new Error(`${QUERY_EXECUTION_ERROR} \n ${err}`);
    }
}

/**
 * @description
 * Reset the password of the user and send it by email,
 * IsAccountActive is setted to false in order to make the user have to change the password at the first access.
 */
export const resetPasswordByEmail = async (user: IUser, dbConnection: Connection, res: Response) => {
    try{
        if(isResetPasswordEmailHasBeenSent(user)){
            res.status(403).send(RESET_PASSWORD_ALREADY_SENT);
            return;
        }
        const textPlainPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(textPlainPassword, 10);
        user.passwordResetRequestedAt = new Date();
        user.password = hashedPassword;
        user.isAccountActive = false;
        await user.save();
        sendResetPasswordEmail(user, res, textPlainPassword);
        res.status(201).send(RESET_PASSWORD_SUCCESSFUL);
    }catch (err){
        console.error(`${RESET_PASSWORD_ERROR} \n ${err}`);
        throw new Error(`${RESET_PASSWORD_ERROR} \n ${err}`);
    }
}

/**
 * @param user 
 * User to check on.
 * @description
 * Check if the reset email has been sent before 3h
 */
function isResetPasswordEmailHasBeenSent(user: IUser): boolean {
    const now = new Date();
    const THREE_HOURS = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    // Check if a password reset was requested within the last three hours
    if (user.passwordResetRequestedAt && (now.getTime() - user.passwordResetRequestedAt.getTime()) < THREE_HOURS) {
      return true;
    }
    return false;
}

