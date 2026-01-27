import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StaffService } from "./staff.service";

const createStaff = catchAsync(async (req: Request, res: Response) => {
  const result = await StaffService.createStaff(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Staff created successfully",
    data: result,
  });
});

const getAllStaff = catchAsync(async (req: Request, res: Response) => {
  const result = await StaffService.getAllStaff();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Staff retrieved successfully",
    data: result,
  });
});

export const StaffController = {
  createStaff,
  getAllStaff,
};
