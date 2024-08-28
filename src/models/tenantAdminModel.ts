import mongoose, {Model, Schema} from "mongoose";
import { IUser, UserDocument, UserSchema } from "./userModel";
import { TENANT_ADMIN_MODEL_NAME } from "../constants/dbConstants";
import { AppAdminSchema } from "./appAdminModel";

export interface ITenantAdmin extends IUser {
    blocked: boolean;
}

export interface TenantDocument extends UserDocument {};
/**
 * @todo
 * how did I concatenate an object using this syntax?
 * ...UserSchema.obj as Schema<ITenantAdmin>,
 */
export const TenantAdminSchema : Schema<ITenantAdmin> = new Schema({
    ...UserSchema.obj as Schema<ITenantAdmin>,
    blocked: {
        type: Boolean
    }
}, {timestamps: true});

const TenantAdminModel: Model<ITenantAdmin> = mongoose.model<ITenantAdmin>(TENANT_ADMIN_MODEL_NAME, TenantAdminSchema);
export default TenantAdminModel;
