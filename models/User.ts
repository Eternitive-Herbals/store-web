import { Schema, Document,model, models}from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  role: "Customer" | "Admin" | "Distributer";
  mobile?: string;
  addresses?: Array<{
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    isDefault: boolean;
  }>;
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
    addresses: [
      {
        fullName: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        pincode: String,
        country: String,
        isDefault: { type: Boolean, default: false },
      },
    ],
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
