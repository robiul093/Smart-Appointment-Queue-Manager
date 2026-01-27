import { Types } from "mongoose";
import { AppError } from "../../utils/AppError";
import { Service } from "../services/service.model";
import { Staff } from "../staff/staff.model";
import { IAppointment } from "./appointment.interface";
import { Appointment } from "./appointment.model";

// Conflict Check Helper
const checkConflict = async (
  staffId: string,
  date: Date,
  duration: number
): Promise<boolean> => {
  const start = new Date(date);
  const end = new Date(start.getTime() + duration * 60000); // end time in ms

  const dayStart = new Date(start);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(start);
  dayEnd.setHours(23, 59, 59, 999);

  const dailyAppts = await Appointment.find({
    staffId,
    status: "Scheduled",
    date: { $gte: dayStart, $lte: dayEnd },
  }).populate("serviceId").lean();

  for (let appt of dailyAppts) {
    const apptStart = new Date(appt.date);
    // @ts-ignore
    const apptDuration = (appt.serviceId as any)?.duration || 0;
    const apptEnd = new Date(apptStart.getTime() + apptDuration * 60000);

    // Check overlap
    if (start < apptEnd && end > apptStart) {
      return true; // Conflict
    }
  }
  return false;
};

const createAppointment = async (payload: IAppointment) => {
  const service = await Service.findById(payload.serviceId);
  if (!service) throw new AppError(404, "Service not found");

  // If staffId is provided, check capacity and conflict
  if (payload.staffId) {
    const staff = await Staff.findById(payload.staffId);
    if (!staff) throw new AppError(404, "Staff not found");

    // Check Daily Capacity
    const startOfDay = new Date(payload.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(payload.date);
    endOfDay.setHours(23, 59, 59, 999);

    const count = await Appointment.countDocuments({
      staffId: payload.staffId,
      status: "Scheduled",
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (count >= staff.dailyCapacity) {
      // Staff Full -> Enqueue
      const queueCount = await Appointment.countDocuments({ status: "Pending" });
      const newAppt = await Appointment.create({
        ...payload,
        staffId: undefined, // Unassign
        status: "Pending",
        queuePosition: queueCount + 1,
      });
      return { appointment: newAppt, queued: true, message: "Staff capacity full. Added to Queue." };
    }

    // Check Time Conflict
    const isConflict = await checkConflict(
      payload.staffId.toString(),
      payload.date,
      service.duration
    );

    if (isConflict) {
      throw new AppError(409, "Time conflict. Staff already booked at this time.");
    }

    const appt = await Appointment.create({ ...payload, status: "Scheduled" });
    return appt;
  } else {
    // Direct Queue (No staff selected)
    const queueCount = await Appointment.countDocuments({ status: "Pending" });
    const newAppt = await Appointment.create({
      ...payload,
      staffId: undefined,
      status: "Pending",
      queuePosition: queueCount + 1,
    });
    return { appointment: newAppt, queued: true, message: "Added to Queue." };
  }
};

const getAllAppointments = async (query: any) => {
    const { date, staffId } = query;
    const filter: any = {};
    
    if (staffId) filter.staffId = staffId;
    if (date) {
      const dayStart = new Date(date); dayStart.setHours(0,0,0,0);
      const dayEnd = new Date(date); dayEnd.setHours(23,59,59,999);
      filter.date = { $gte: dayStart, $lte: dayEnd };
    }

    const result = await Appointment.find(filter)
      .populate('staffId')
      .populate('serviceId')
      .sort({ date: 1 })
      .lean();
    return result;
};

export const AppointmentService = {
  createAppointment,
  getAllAppointments
};
