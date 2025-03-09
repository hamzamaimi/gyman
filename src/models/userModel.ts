import mongoose, {Document, Model, Schema} from "mongoose";
import {USER_ROLES, GENDERS} from '../constants/userConstants';
import {TENANTS_LIST} from "../constants/tenantConstants";

export interface IUser extends Document{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    gender: string;
    birthDay: Date;
    password: string;
    role: string;
    //Rappresents the tenant of the user
    tenant: string;
    //If true means that the user has been blocked cause of many wrong login attempts
    blocked: Boolean;
    //Number of wrong attempts in row, after a successful login it will be reset to 0
    wrongAttempts: number;
    //When is it false the user can only do the login
    //In order to activate the account and use the whole app the user has to change the password.
    isAccountActive: Boolean;
    //The date time field that contains the last time the user requests a password reset
    passwordResetRequestedAt: Date;
}

export interface UserDocument extends IUser, Document {}

export const UserSchema: Schema<IUser> = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        trim:true,
    },
    gender: {
        type: String,
        trim: true,
        enum: GENDERS
    },
    birthDay: {
        type: Date,
        trim: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: USER_ROLES
    },
    tenant: {
        type: String,
        enum: TENANTS_LIST
    },
    blocked: {
        type: Boolean,
        default: false
    },
    wrongAttempts: {
        type: Number,
        default: 0
    },
    isAccountActive: {
        type: Boolean,
        default: false
    },
    passwordResetRequestedAt:{
        type: Date
    }
}, {timestamps: true});

//Create and export the User model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;