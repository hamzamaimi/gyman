import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { createNewUser, generateRandomPassword, sendRegistrationEmail, validateRegistrationData } from "../utils/authenticationUtils";
import  User, { IUser } from "../models/userModel";
import { getRoleForNewUser, getUserByToken } from "../utils/userUtils";
import { USER_NULL } from "../constants/errorsConstants";


/**
 * @description
 * A user with a 'app-admin' role can create only users with 'tenant-admin' role.
 * a user with a 'tenant-admin' role can create only users users with 'member' role.
 * @param req.body.sendEmail 
 * Boolean flag, if true send confirmation email with the user data and a temporary generated password to access the app.
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
    res.send('executed!')
    // const {email, password} = req.body;
    // /**
    //  * @todo 
    //  * remove the undefined and get the user from the database
    //  */
    // const user : IUser | undefined = undefined; 
    // if(user == null){
    //     return res.status(400).send('Cannot find user');
    // }
    // try{
    //     /**
    //      * @todo
    //      * compare the received password with the hashed password in the db
    //      * remove all the inline strings and put them in a separate resources file
    //      */
    //     if(await bcrypt.compare(password, "user.password")){
    //         res.send('logged in')
    //     }else{
    //         res.send('Email or password does not match');
    //     }
    // }catch{
    //     res.status(500).send('Email or password does not match');
    // }
}

/**
 * @param req.body.email
 * Contains the email of the user that wants to restore his password .
*/
export const restorePassword = (req:Request, res:Response) => {
    const {email} = req.body;
}

