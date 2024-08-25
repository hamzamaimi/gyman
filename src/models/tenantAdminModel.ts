import mongoose, {Model, Schema} from "mongoose";
import { IUser, UserDocument } from "./userModel";

export interface ITenantAdmin extends IUser {
    blocked: boolean;
}

export interface TenantDocument extends UserDocument {};

export const TenantAdminSchema : Schema<ITenantAdmin> = new Schema({
    blocked: {
        type: Boolean
    }
});

const TenantAdminModel: Model<ITenantAdmin> = mongoose.model<ITenantAdmin>('TenantAdmin', TenantAdminSchema);
export default TenantAdminModel;
