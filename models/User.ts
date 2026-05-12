import { Schema, Document, model, models, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  role: "Customer" | "Admin" | "Distributer";
  mobile?: string;
  primaryAddress?: Types.ObjectId | null;
  emailVerified: boolean;
  emailOtp?: string | null;
  emailOtpExpiry?: Date | null;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    primaryAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },
    role: {
      type: String,
      enum: ["Customer", "Admin", "Distributer"],
      default: "Customer",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailOtp: {
      type: String,
      default: null,
    },
    emailOtpExpiry: {
      type: Date,
      default: null,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = models.User || model("User", userSchema);

export default User;
