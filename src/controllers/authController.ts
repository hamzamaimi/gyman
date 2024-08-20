import { Request, Response } from "express";

/**
 * @description
 * A user with a 'app-admin' role can create only users with 'tenant-admin' role.
 * a user with a 'tenant-admin' role can create only users users with 'member' role.
 * @param req.body.sendEmail 
 * Boolean flag, if true send confirmation email with the user data and a temporary generated password to access the app.
 * @todo 
 * generate a random password for the user.
*/
export const registerUser = async (req:Request, res:Response) => {
    const {name, lastname, email, sendEmail, tenant} = req.body;
}

/**
 * @param req.body.email
 * Contains the email of the user that wants to restore his password .
*/
export const restorePassword = (req:Request, res:Response) => {
    const {email} = req.body;
}

/**
 * @todo
 * after 4 failed attempt block the account. 
*/
export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;
}