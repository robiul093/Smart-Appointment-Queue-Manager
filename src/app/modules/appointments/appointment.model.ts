import { Schema, model } from 'mongoose';
import { IAppointment, AppointmentModel } from './appointment.interface';

const appointmentSchema = new Schema<IAppointment, AppointmentModel>(
  {
    customerName: { type: String, required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    staffId: { type: Schema.Types.ObjectId, ref: 'Staff', default: null },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled', 'No-Show', 'Pending'],
      default: 'Scheduled',
    },
    queuePosition: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Appointment = model<IAppointment, AppointmentModel>('Appointment', appointmentSchema);
