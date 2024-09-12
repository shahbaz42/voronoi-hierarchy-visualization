import { EmployeeDocument } from '../../constants';
import mongoose, { Schema, Document } from 'mongoose';

const DataSchema: Schema = new Schema({
    url: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} }
});

const EmployeeSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    profile: { type: String, required: true },
    department: { type: String, required: true },
    specialization: { type: String, required: true }
});


export const Employee = mongoose.model<EmployeeDocument>('Employee', EmployeeSchema);