import { User } from "./auth.model";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (payload: Record<string, any>) => {
  const isExist = await User.findOne({ email: payload.email });
  if (isExist) {
    throw new AppError(400, "User already exists");
  }

  const result = await User.create(payload);
  const userObj = result.toObject();
  // @ts-ignore
  const { password, ...userWithoutPassword } = userObj;
  return userWithoutPassword;
};

const loginUser = async (payload: Record<string, any>) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user || !user.password) {
    throw new AppError(404, "User not found or password missing");
  }

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    throw new AppError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "10d" }
  );

  return { token };
};

export const AuthService = {
  registerUser,
  loginUser,
};
