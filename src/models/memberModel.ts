import mongoose, {Model, Schema} from "mongoose";
import { IUser, UserDocument } from "./userModel";

/**
 * @todo
 * add a payment field that store the history of the payments of the user
 */
export interface IMember extends IUser{
    active: boolean;
}

export interface MemberDocument extends UserDocument {};

export const MemberSchema : Schema<IMember> = new Schema({
    active: {
        type: Boolean
    }
});

const MemberModel:Model<IMember> = mongoose.model<IMember>('Member', MemberSchema);
export default MemberModel;