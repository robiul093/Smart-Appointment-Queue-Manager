import { Schema, model } from 'mongoose';
import { IService, ServiceModel } from './service.interface';

const serviceSchema = new Schema<IService, ServiceModel>(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    requiredStaffType: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Service = model<IService, ServiceModel>('Service', serviceSchema);
