import mongoose, {Model, Schema} from "mongoose";
import { IUser, UserDocument, UserSchema } from "./userModel";
import { MEMBER_MODEL_NAME } from "../constants/dbConstants";

export interface IMember extends IUser{}

export interface MemberDocument extends UserDocument {};

export const MemberSchema : Schema<IMember> = new Schema(UserSchema.obj, {timestamps: true});

const MemberModel:Model<IMember> = mongoose.model<IMember>(MEMBER_MODEL_NAME, MemberSchema);
export default MemberModel;