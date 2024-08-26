import mongoose, {Model, Schema} from "mongoose";
import { IUser, UserDocument, UserSchema } from "./userModel";
import { APP_ADMIN_MODEL_NAME } from "../constants/dbConstants";

export interface IAppAdmin extends IUser {}

export interface AppAdminDocument extends UserDocument {};

export const AppAdminSchema: Schema<IAppAdmin> = new Schema(UserSchema.obj, {timestamps: true});

const AdminModel: Model<IAppAdmin> = mongoose.model<IAppAdmin>(APP_ADMIN_MODEL_NAME, AppAdminSchema);
export default AdminModel;