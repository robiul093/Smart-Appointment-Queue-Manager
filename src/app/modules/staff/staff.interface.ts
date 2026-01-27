import { Model } from 'mongoose';

export interface IStaff {
  name: string;
  serviceType: string;
  dailyCapacity: number;
  availabilityStatus: 'Available' | 'On Leave';
}

export type StaffModel = Model<IStaff, Record<string, unknown>>;
