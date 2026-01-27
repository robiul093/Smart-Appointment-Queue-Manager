import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { IAuthUser } from "./auth.interface";

export interface IUserDocument extends IAuthUser, Document {
  password?: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "admin" },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password as string, 12);
});

export const User = mongoose.model<IUserDocument>("User", userSchema);
