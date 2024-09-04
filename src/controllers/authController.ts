import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import * as AuthUtils from "../utils/authenticationUtils";
import { sendRegistrationEmail } from "../utils/sendEmailUtills";
import { IUser } from "../models/userModel";
import * as UserUtils from "../utils/userUtils";
import * as Errors from "../constants/errorsConstants";
import { Connection } from "mongoose";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as SucessConstants from "../constants/sucessConstants";
import { JWT } from "../constants/cookiesConstants";

dotenv.config();

/**
 * @description
 * A user with a 'app-admin' role can create only users with 'tenant-admin' role.
 * a user with a 'tenant-admin' role can create only users users with 'member' role.
 * @param req.body.sendEmail 
 * Boolean flag, if true send confirmation email with the user data and a temporary generated password to access the app.
*/
export const registerUser = async (req:Request, res:Response) => {
    const {name, lastname, email, sendEmail, tenant} = req.body;
    const dbConnection = res.locals.dataBaseConnection;

    const errorsInInputData: string[] = await AuthUtils.validateRegistrationData(name, lastname, email, dbConnection);
    if (errorsInInputData.length > 0) {
        return res.status(400).json({ errors: errorsInInputData });
    }

    const currentUser = await UserUtils.getUserByToken(req.cookies, dbConnection);
    if(currentUser == null){
        throw new Error(Errors.USER_NULL)
    }
    const tenantForNewUser = AuthUtils.getTenantForNewUser(currentUser, tenant);
    const roleForNewUser: string = AuthUtils.getRoleForNewUser(currentUser.role);
    try{
        const password = AuthUtils.generateRandomPassword();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: IUser = await UserUtils.createNewUser(name, lastname, email, 
            tenantForNewUser, roleForNewUser, hashedPassword, dbConnection);
        if(sendEmail){ 
            sendRegistrationEmail(user, res, password);
        }
        res.status(201).send(SucessConstants.USER_CREATED);
    }catch(err){
        console.error(`${Errors.REGISTRATION_ERROR} \n ${err}`);
        res.status(500).send(Errors.REGISTRATION_ERROR);
    }
}


export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;
    const dbConnection: Connection = res.locals.dataBaseConnection;

    let user: IUser | null = await UserUtils.getUserByEmail(dbConnection, email);
    if(user == null){
        return res.status(401).send(Errors.WRONG_CREDENTIALS_ERROR);
    }
    if(user.blocked){
        return res.status(403).send(Errors.ACCOUNT_BLOCKED);
    }

    try{
        //Compare the text plain password with the incrypted one stored in the database.
        await bcrypt.compare(password, user.password).then(async (result) => {
            if(!result){
                await UserUtils.increaseWrongAttemptsField(user);
                if(user.wrongAttempts > 3){
                    UserUtils.blockAccountAndSendEmail(user, dbConnection, res);
                    return res.status(401).send(Errors.ACCOUNT_HAS_BEEN_BLOCKED);
                }
                console.error(Errors.PASSWORD_NOT_MATCH);
                return res.status(401).send(Errors.WRONG_CREDENTIALS_ERROR);
            }
            const accessToken = generateJwt(user);
            setJwtHttpOnlyCookie(accessToken, res);
            UserUtils.resetWrongAttemptsField(user);
            res.status(201).send(SucessConstants.LOGIN_SUCCESSFUL);
        })
    }catch(err){
        console.error(err);
        return res.status(500).send();
    }
}
/**
 * @description
 * The user create a new password for it's account.
 * When the user change it's password, the isAccountActive user field become true.
 * The user should be logged in to change his password. 
 */
export const changePassword = async (req: Request, res: Response) => {
    const {password} = req.body;
    if(!AuthUtils.isPasswordSecure(password)){
        return res.status(400).send(Errors.PASSWORD_NOT_SECURE);
    }
    const dbConnection = res.locals.dataBaseConnection;
    const currentUser = await UserUtils.getUserByToken(req.cookies, dbConnection);
    if(!currentUser){
        console.error(Errors.USER_NULL);
        return res.status(500).send(Errors.TOKEN_ERROR);
    }
    currentUser.password = await bcrypt.hash(password, 10);
    currentUser.isAccountActive = true;
    currentUser.save();
    return res.status(200).send(SucessConstants.PASSWORD_CORRECTLY_CHANGED);
}

/**
 * @param accessToken
 * Token to put in the HttpOnly cookie.
 * @param res
 * Http respose.
 */
function setJwtHttpOnlyCookie(accessToken: string, res: Response) {
    res.cookie(JWT, accessToken, {
        httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client-side JS
        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS in production
        sameSite: 'strict', // Controls whether a cookie is sent with cross-site requests; use 'lax' or 'strict'
        maxAge: 30 * 24 * 60 * 60 * 1000, //One month in milliseconds
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
        console.log(Errors.ENV_CONSTANT_ERROR);
        throw new Error(Errors.ENV_CONSTANT_ERROR);
    }
    const accessToken = jwt.sign(user.toJSON(), tokenSecret, { expiresIn: '30d' });
    return accessToken;
}

/**
 * @param req.body.email
 * Contains the email of the user that wants to reset his password.
 * @description
 * Reset the password of the user and send it to the user by email, 
 * during the first access he has to change his password.
*/
export const resetPassword = async (req:Request, res:Response) => {
    const {email} = req.body;
    const dbConnection: Connection = res.locals.dataBaseConnection;
    const user: IUser|null = await UserUtils.getUserByEmail(dbConnection, email);
    if(!user){
        res.status(201).send(SucessConstants.RESET_PASSWORD_SUCCESSFUL);
        console.error(`Error in resetPassword function: ${Errors.USER_NULL} ${email}`);
        return;
    }
    UserUtils.resetPasswordByEmail(user, dbConnection, res);
}
