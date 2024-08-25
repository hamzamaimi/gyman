import mongoose, {Model, Schema} from "mongoose";
import { IUser, UserDocument, UserSchema } from "./userModel";

export interface IAppAdmin extends IUser {}

export interface AppAdminDocument extends UserDocument {};

export const AppAdminSchema: Schema<IAppAdmin> = new Schema(UserSchema.obj, {timestamps: true});

const AdminModel: Model<IAppAdmin> = mongoose.model<IAppAdmin>('AppAdmin', AppAdminSchema);
export default AdminModel;