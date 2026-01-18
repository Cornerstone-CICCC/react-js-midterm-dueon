import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
  joinedDate: string;
  status: boolean;
}

const UserSchema: Schema = new Schema(
  {
    id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    joinedDate: {
      type: String,
      required: true,
      default: () => new Date().toISOString(),
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
