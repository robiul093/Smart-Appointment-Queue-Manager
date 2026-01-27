import { Schema, model } from 'mongoose';
import { IStaff, StaffModel } from './staff.interface';

const staffSchema = new Schema<IStaff, StaffModel>(
  {
    name: { type: String, required: true },
    serviceType: { type: String, required: true },
    dailyCapacity: { type: Number, default: 5 },
    availabilityStatus: {
      type: String,
      enum: ['Available', 'On Leave'],
      default: 'Available',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Staff = model<IStaff, StaffModel>('Staff', staffSchema);
