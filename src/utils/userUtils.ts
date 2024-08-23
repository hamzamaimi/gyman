import { JWT_TOKEN } from "../constants/cookiesConstants"
import { ROLE_NOT_FOUND } from "../constants/errorsConstants";
import { APP_ADMIN_ROLE, MEMBER_ROLE, TENANT_ADMIN_ROLE, USER_ROLES } from "../constants/userConstants";
import User, { UserDocument } from "../models/userModel";

const jwt = require('jsonwebtoken');

/**
 * @param cookies
 * Contains the application cookies, make sure that the jwtToken is in there.
 * @todo
 * put the secret in the .env file
 */
export const getUserByToken = async (cookies: Record<string, any>): Promise<UserDocument | null>  => {
    const jwtToken = cookies[JWT_TOKEN];
    const jwtSecret = process.env.JWT_SECRET;

    // Verify and decode the token
    const decoded = jwt.verify(jwtToken, jwtSecret);

    // Extract user ID from the decoded token
    const userId = decoded.sub;
    return await User.findById(userId).exec();
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