import { IStaff } from "./staff.interface";
import { Staff } from "./staff.model";

const createStaff = async (payload: IStaff): Promise<IStaff> => {
  const result = await Staff.create(payload);
  return result;
};

const getAllStaff = async (): Promise<IStaff[]> => {
  const result = await Staff.find();
  return result;
};

export const StaffService = {
  createStaff,
  getAllStaff,
};
