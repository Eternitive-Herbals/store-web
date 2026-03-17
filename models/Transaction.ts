import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["card", "upi", "netbanking", "cod"],
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    }
  },
  { timestamps: true },
);

export const Transaction = model("Transaction", TransactionSchema);
