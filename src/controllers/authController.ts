import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { createNewUser, generateRandomPassword, sendRegistrationEmail, validateRegistrationData } from "../utils/authenticationUtils";
import { IUser, UserSchema } from "../models/userModel";
import { getRoleForNewUser, getUserByToken } from "../utils/userUtils";
import { ENV_CONSTANT_ERROR, QUERY_EXECUTION_ERROR, USER_NULL, WRONG_CREDENTIALS_ERROR } from "../constants/errorsConstants";
import { Connection, Model } from "mongoose";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { AppAdminSchema } from "../models/appAdminModel";
import { TenantAdminSchema } from "../models/tenantAdminModel";
import { MemberSchema } from "../models/memberModel";
import { LOGIN_SUCCESSFUL } from "../constants/sucessConstants";

dotenv.config();

/**
 * @description
 * A user with a 'app-admin' role can create only users with 'tenant-admin' role.
 * a user with a 'tenant-admin' role can create only users users with 'member' role.
 * @param req.body.sendEmail 
 * Boolean flag, if true send confirmation email with the user data and a temporary generated password to access the app.
 * @todo
 * send email for account confirmation
*/
export const registerUser = async (req:Request, res:Response) => {
    const {name, lastname, email, sendEmail, tenant} = req.body;

    const errorsInInputData: string[] = validateRegistrationData(name, lastname, email, tenant);
    if (errorsInInputData.length > 0) {
        return res.status(400).json({ errors: errorsInInputData });
    }
    const currentUser = await getUserByToken(req.cookies);
    if(currentUser == null){
        throw new Error(USER_NULL)
    }
    const roleForNewUser: string = getRoleForNewUser(currentUser.role);
    try{
        const password = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: IUser = await createNewUser(name, lastname, email, tenant, roleForNewUser, hashedPassword);
        if(sendEmail) sendRegistrationEmail(user);
        res.status(201).send();
    }catch(err){
        console.error('Error during registration: '+ err);
        res.status(500).send();
    }
}

/**
 * @todo
 * after 4 failed attempt block the account. 
*/
export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;
    const dbConnection: Connection = res.locals.dataBaseConnection;

    let user: IUser | null = await findUserByEmail(dbConnection, email);
    if(user == null){
        return res.status(400).send(WRONG_CREDENTIALS_ERROR);
    }
    try{
        //Compare the text plain password with the incrypted one stored in the database.
        //If the comparison is fine 
        await bcrypt.compare(password, user.password).then(() => {
            const accessToken = generateJwt(user);
            setJwtHttpOnlyCookie(accessToken, res);
            res.send(LOGIN_SUCCESSFUL);
        })
    }catch(err){
        console.error(err);
        return res.status(500).send();
    }
}
/**
 * @param accessToken
 * Token to put in the HttpOnly cookie.
 * @param res
 * The request response.
 */
function setJwtHttpOnlyCookie(accessToken: string, res: Response) {
    res.cookie('token', accessToken, {
        httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client-side JS
        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS in production
        sameSite: 'strict', // Controls whether a cookie is sent with cross-site requests; use 'lax' or 'strict'
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
}

/**
 * @param user 
 * User object to put in the token.
 * @returns
 * Json web token string.
 */
function generateJwt(user: IUser): string{
    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!tokenSecret) {
        console.log(ENV_CONSTANT_ERROR);
        throw new Error(ENV_CONSTANT_ERROR);
    }
    const accessToken = jwt.sign(user.toJSON(), tokenSecret, { expiresIn: '30d' });
    return accessToken;
}

/**
 * @param dbConnection
 * Database connection.
 * @param email 
 * The email of the user to find.
 * @returns 
 * A user object if the user exists or null.
 */
async function findUserByEmail(dbConnection: Connection, email: String) {
    const appAdminModel = dbConnection.model('AppAdmin', AppAdminSchema);
    const tenantAdminModel = dbConnection.model('TenantAdmin', TenantAdminSchema);
    const memberModel = dbConnection.model('Member', MemberSchema);
    let user: IUser | null = null;
    try {
        user = await tenantAdminModel.findOne({ email }).exec();
        if (user) return user;
        user = await memberModel.findOne({ email }).exec();
        if (user) return user;
        user = await appAdminModel.findOne({ email: email }).exec();
    } catch (err) {
        console.error(QUERY_EXECUTION_ERROR, err);
        throw new Error(QUERY_EXECUTION_ERROR + " " + err);
    }
    return user;
}

/**
 * @param req.body.email
 * Contains the email of the user that wants to restore his password.
 * @todo
*/
export const restorePassword = (req:Request, res:Response) => {
    const {email} = req.body;
}

