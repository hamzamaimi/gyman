import mongoose, {Schema} from "mongoose";
import { IUser } from "./userModel";

export interface IAppAdmin extends IUser {

}

const AppAdminSchema: Schema<IAppAdmin> = new Schema();

export default mongoose.model<IAppAdmin>('AppAdmin', AppAdminSchema);