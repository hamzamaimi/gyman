import mongoose, {Model, Schema} from "mongoose";
import { IUser, UserDocument, UserSchema } from "./userModel";
import { TENANT_ADMIN_MODEL_NAME } from "../constants/dbConstants";

export interface ITenantAdmin extends IUser {}

export interface TenantDocument extends UserDocument {};

export const TenantAdminSchema : Schema<ITenantAdmin> = new Schema(UserSchema.obj, {timestamps: true});

const TenantAdminModel: Model<ITenantAdmin> = mongoose.model<ITenantAdmin>(TENANT_ADMIN_MODEL_NAME, TenantAdminSchema);
export default TenantAdminModel;
