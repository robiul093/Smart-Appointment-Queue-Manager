import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";
import { AppError } from "../../utils/AppError";

const createService = catchAsync(async (req: Request, res: Response) => {
  if (!req.body) {
    throw new AppError(404, "Payload not found");
  }
  const result = await ServiceServices.createService(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.getAllServices();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Services retrieved successfully",
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
};
