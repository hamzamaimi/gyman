import mongoose, {Model, Schema} from "mongoose";
import { IUser, UserDocument } from "./userModel";
import { TENANT_ADMIN_MODEL_NAME } from "../constants/dbConstants";

export interface ITenantAdmin extends IUser {
    blocked: boolean;
}

export interface TenantDocument extends UserDocument {};

export const TenantAdminSchema : Schema<ITenantAdmin> = new Schema({
    blocked: {
        type: Boolean
    }
});

const TenantAdminModel: Model<ITenantAdmin> = mongoose.model<ITenantAdmin>(TENANT_ADMIN_MODEL_NAME, TenantAdminSchema);
export default TenantAdminModel;
