import mongoose, {Schema} from "mongoose";
import { IUser } from "./userModel";

export interface ITenantAdmin extends IUser {
    blocked: boolean;
}

const TenantAdminSchema : Schema<ITenantAdmin> = new Schema({
    blocked: {
        type: Boolean
    }
});

export default mongoose.model<ITenantAdmin>('TenantAdmin', TenantAdminSchema);
