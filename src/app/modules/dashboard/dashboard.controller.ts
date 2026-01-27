import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Appointment } from "../appointments/appointment.model";
import { Staff } from "../staff/staff.model";

const getStats = catchAsync(async (req: Request, res: Response) => {
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const totalAppointments = await Appointment.countDocuments({
    date: {
      $gte: startOfToday,
      $lte: endOfToday,
    },
  });

  const pendingCount = await Appointment.countDocuments({ status: "Pending" });
  const completedCount = await Appointment.countDocuments({ status: "Completed" });

  const staffLoad = await Staff.aggregate([
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

  sendResponse(res, {
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
});

export const DashboardController = {
  getStats,
};
