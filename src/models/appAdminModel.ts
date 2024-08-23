import mongoose, {Model, Schema} from "mongoose";
import { IUser, UserDocument } from "./userModel";

export interface IAppAdmin extends IUser {

}

export interface AppAdminDocument extends UserDocument {};

const AppAdminSchema: Schema<IAppAdmin> = new Schema();

const AdminModel: Model<IAppAdmin> = mongoose.model<IAppAdmin>('AppAdmin', AppAdminSchema);
export default AdminModel;