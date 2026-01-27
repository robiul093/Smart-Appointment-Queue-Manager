import { Model, Types } from 'mongoose';

export interface IAppointment {
  customerName: string;
  serviceId: Types.ObjectId;
  staffId?: Types.ObjectId;
  date: Date;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show' | 'Pending';
  queuePosition: number;
}

export type AppointmentModel = Model<IAppointment, Record<string, unknown>>;
