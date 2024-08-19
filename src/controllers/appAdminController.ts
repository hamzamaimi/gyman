import { Request, Response } from "express";
/**
 * @description 
 * Create tenant administrator, only an app administator can access to this api. 
 * When the app administrator create a tenant administrator the application gonna send a confirmation email
 * that can be used to confirm the account and to choose a password
 */
export const registerAdminTenant = async (req:Request, res:Response) => {
    const {name, lastname, email, password, tenant} = req.body;
}

/**
 * @description
 * Create a tenant 
 */
export const registerTenant = async (req:Request, res:Response) => {
    const {name, ragioneSociale, logo} = req.body;
}

/**
 * @description
 * edit a tenant info
 */


/**
 * @description
 * disable a tenant and it's info
 */


