import mongoose, { model, Model, Schema } from "mongoose";

export interface ITenant extends Document {
    domain: string;
    name: string;
}

export interface TenantDocument extends ITenant, Document {}

export const TenantSchema = new Schema<ITenant>({
    domain: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Tenant: Model<ITenant> = mongoose.model<ITenant>('Tenant', TenantSchema);
export default Tenant;
