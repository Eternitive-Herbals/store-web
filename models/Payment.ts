import { Schema, models, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

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

    transactionId: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Payment = models.Payment || model("Payment", PaymentSchema);
