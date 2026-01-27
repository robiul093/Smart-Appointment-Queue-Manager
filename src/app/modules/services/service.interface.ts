import { Model } from 'mongoose';

export interface IService {
  name: string;
  duration: number; // in minutes
  requiredStaffType: string;
}

export type ServiceModel = Model<IService, Record<string, unknown>>;
