"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const AppError_1 = require("../../utils/AppError");
const service_model_1 = require("../services/service.model");
const staff_model_1 = require("../staff/staff.model");
const appointment_model_1 = require("./appointment.model");
// Conflict Check Helper
const checkConflict = (staffId, date, duration) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const start = new Date(date);
    const end = new Date(start.getTime() + duration * 60000); // end time in ms
    const dayStart = new Date(start);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(start);
    dayEnd.setHours(23, 59, 59, 999);
    const dailyAppts = yield appointment_model_1.Appointment.find({
        staffId,
        status: "Scheduled",
        date: { $gte: dayStart, $lte: dayEnd },
    }).populate("serviceId").lean();
    for (let appt of dailyAppts) {
        const apptStart = new Date(appt.date);
        // @ts-ignore
        const apptDuration = ((_a = appt.serviceId) === null || _a === void 0 ? void 0 : _a.duration) || 0;
        const apptEnd = new Date(apptStart.getTime() + apptDuration * 60000);
        // Check overlap
        if (start < apptEnd && end > apptStart) {
            return true; // Conflict
        }
    }
    return false;
});
const createAppointment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(payload.serviceId);
    if (!service)
        throw new AppError_1.AppError(404, "Service not found");
    // If staffId is provided, check capacity and conflict
    if (payload.staffId) {
        const staff = yield staff_model_1.Staff.findById(payload.staffId);
        if (!staff)
            throw new AppError_1.AppError(404, "Staff not found");
        // Check Daily Capacity
        const startOfDay = new Date(payload.date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(payload.date);
        endOfDay.setHours(23, 59, 59, 999);
        const count = yield appointment_model_1.Appointment.countDocuments({
            staffId: payload.staffId,
            status: "Scheduled",
            date: { $gte: startOfDay, $lte: endOfDay },
        });
        if (count >= staff.dailyCapacity) {
            // Staff Full -> Enqueue
            const queueCount = yield appointment_model_1.Appointment.countDocuments({ status: "Pending" });
            const newAppt = yield appointment_model_1.Appointment.create(Object.assign(Object.assign({}, payload), { staffId: undefined, status: "Pending", queuePosition: queueCount + 1 }));
            return { appointment: newAppt, queued: true, message: "Staff capacity full. Added to Queue." };
        }
        // Check Time Conflict
        const isConflict = yield checkConflict(payload.staffId.toString(), payload.date, service.duration);
        if (isConflict) {
            throw new AppError_1.AppError(409, "Time conflict. Staff already booked at this time.");
        }
        const appt = yield appointment_model_1.Appointment.create(Object.assign(Object.assign({}, payload), { status: "Scheduled" }));
        return appt;
    }
    else {
        // Direct Queue (No staff selected)
        const queueCount = yield appointment_model_1.Appointment.countDocuments({ status: "Pending" });
        const newAppt = yield appointment_model_1.Appointment.create(Object.assign(Object.assign({}, payload), { staffId: undefined, status: "Pending", queuePosition: queueCount + 1 }));
        return { appointment: newAppt, queued: true, message: "Added to Queue." };
    }
});
const getAllAppointments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, staffId } = query;
    const filter = {};
    if (staffId)
        filter.staffId = staffId;
    if (date) {
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);
        filter.date = { $gte: dayStart, $lte: dayEnd };
    }
    const result = yield appointment_model_1.Appointment.find(filter)
        .populate('staffId')
        .populate('serviceId')
        .sort({ date: 1 })
        .lean();
    return result;
});
exports.AppointmentService = {
    createAppointment,
    getAllAppointments
};
