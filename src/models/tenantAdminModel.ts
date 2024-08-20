import mongoose, {Schema} from "mongoose";
import { IUser } from "./userModel";

export interface ITenantAdmin extends IUser {
    
}

const TenantAdminSchema : Schema<ITenantAdmin> = new Schema();

export default mongoose.model<ITenantAdmin>('TenantAdmin', TenantAdminSchema);
