import { ROLE_NOT_FOUND, USER_CREATION_ERROR } from "../constants/errorsConstants";
import { TENANTS_LIST } from "../constants/tenantCosntants";
import { APP_ADMIN_ROLE, MEMBER_ROLE, TENANT_ADMIN_ROLE } from "../constants/userConstants";
import AdminModel from "../models/appAdminModel";
import MemberModel from "../models/memberModel";
import TenantAdminModel from "../models/tenantAdminModel";
import { IUser, UserDocument } from "../models/userModel";
const crypto = require('crypto');
/**
 * @param length 
 * Containt the length of the password that is going to be generated.
 * @returns 
 * Simply creates a string of random characters from the bytes generated by the crypto module
 */
export const generateRandomPassword = (length = 12) => {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
}

export const validateRegistrationData = (name: string, lastname:string, email:string, tenant:string) => {
    const errors: string[] = [];

    if(!isValidName(name)){
        errors.push('Name must be at least 2 characters long.');
    }
    if(!isValidLastName(lastname)){
        errors.push('Lastname must be at least 2 characters long.');
    }
    if(!isValidEmail(email)){
        errors.push('The email format is not valid.')
    }else if(!isAvailableEmail(email)){
        errors.push('The email is already taken.')
    }
    
    if(!isValidTenant(tenant)){
        errors.push('Invalid tenant.');
    }

    return errors;
}

const isValidEmail = (email: string): boolean => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

const isValidName = (name: string): boolean => name.length >= 2; 

const isValidLastName = (lastname: string): boolean => isValidName(lastname);

const isValidTenant = (tenant: string): boolean => TENANTS_LIST.includes(tenant);

/**
 * @todo
 * TO IMPLEMENT!
 */
const isAvailableEmail = (email:string): boolean => {
    return false
}

export const createNewUser = async (name: string, lastname: string, email: string, tenant: string,
    roleForNewUser: string, hashedPassword: string): Promise<UserDocument> => {
    try{
        let user;
        switch(roleForNewUser){
            case MEMBER_ROLE:
                user = new MemberModel({firstName: name, lastName: lastname, email: email, 
                    tenant: tenant, role: roleForNewUser});
                    break;
            case TENANT_ADMIN_ROLE:
                user = new TenantAdminModel({firstName: name, lastName: lastname, email: email,
                    tenant: tenant, role: roleForNewUser});
                    break;
            case APP_ADMIN_ROLE:
                user = new AdminModel({firstName: name, lastName: lastname, email: email,
                    tenant: tenant, role: roleForNewUser});
                break;
            default:
                throw new Error(ROLE_NOT_FOUND);
        }
        return await user.save();
    }catch(err){
        throw new Error(USER_CREATION_ERROR);
    }
}

/**
 * @todo
 */
export const sendRegistrationEmail = (user: IUser) => {
    
}