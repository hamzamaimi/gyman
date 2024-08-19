import { Request, Response } from "express";

/**
 * @description
 * A tenantAdmin user can register a gym member that is going to receive an email with a link
 * that redirect to a page when he set a password and activate his account 
 */
export const registerGymMember = async (req:Request, res:Response) => {
    const {name, lastname, email, password, sendEmail} = req.body;
}

/**
 * @description
 * edit gym member personal info
 */

/**
 * @description
 * edit gym member payment info
 */

/**
 * @description
 * delete gym member
 */

/**
 * @description
 * send comunication to a gym member
 */

/**
 * get all gym members
 */
