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
    tenant: string;
    blocked: Boolean;
    wrongAttempts: number;
    isMemberShipActive: Boolean;
    isAccountConfirmed: Boolean;
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
    isMemberShipActive: {
        type: Boolean,
        default: false
    },
    isAccountConfirmed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

//Create and export the User model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;