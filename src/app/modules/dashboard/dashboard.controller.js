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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const appointment_model_1 = require("../appointments/appointment.model");
const staff_model_1 = require("../staff/staff.model");
const getStats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));
    const totalAppointments = yield appointment_model_1.Appointment.countDocuments({
        date: {
            $gte: startOfToday,
            $lte: endOfToday,
        },
    });
    const pendingCount = yield appointment_model_1.Appointment.countDocuments({ status: "Pending" });
    const completedCount = yield appointment_model_1.Appointment.countDocuments({ status: "Completed" });
    const staffLoad = yield staff_model_1.Staff.aggregate([
        {
            $lookup: {
                from: "appointments",
                localField: "_id",
                foreignField: "staffId",
                pipeline: [
                    {
                        $match: {
                            date: {
                                $gte: startOfToday,
                                $lte: endOfToday,
                            },
                            status: 'Scheduled'
                        }
                    }
                ],
                as: "appointments",
            },
        },
        {
            $project: {
                name: 1,
                dailyCapacity: 1,
                appointmentCount: { $size: "$appointments" },
            },
        },
    ]);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Stats retrieved",
        data: {
            totalAppointments,
            pendingCount,
            completedCount,
            staffLoad,
        },
    });
}));
exports.DashboardController = {
    getStats,
};
