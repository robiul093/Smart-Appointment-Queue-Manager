import { IService } from "./service.interface";
import { Service } from "./service.model";

const createService = async (payload: IService): Promise<IService> => {
  const result = await Service.create(payload);
  return result;
};

const getAllServices = async (): Promise<IService[]> => {
  const result = await Service.find();
  return result;
};

export const ServiceServices = {
  createService,
  getAllServices,
};
