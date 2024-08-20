import mongoose, {Schema} from "mongoose";
import { IUser } from "./userModel";

/**
 * @todo
 * add a payment field that store the history of the payments of the user
 */
export interface IMember extends IUser{
    active: boolean;
}

const MemberSchema : Schema<IMember> = new Schema({
    active: {
        type: Boolean
    }
});

export default mongoose.model<IMember>('Member', MemberSchema);