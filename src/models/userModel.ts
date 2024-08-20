import mongoose, {Document, Schema} from "mongoose";
import {ROLES, GENDERS} from '../constants/userConstants';
import { tenantsList } from "../constants/tenantCosntants";

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
}

const UserSchema: Schema<IUser> = new Schema({
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
        enum: ROLES
    },
    tenant: {
        type: String,
        required: true,
        enum: tenantsList
    }
}, {timestamps: true});

//Create and export the User model
export default mongoose.model<IUser>('User', UserSchema);
