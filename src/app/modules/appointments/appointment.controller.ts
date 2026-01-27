import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AppointmentService } from "./appointment.service";

const createAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentService.createAppointment(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Appointment created successfully",
    data: result,
  });
});

const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentService.getAllAppointments(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Appointments retrieved successfully",
    data: result,
  });
});

export const AppointmentController = {
  createAppointment,
  getAllAppointments,
};
