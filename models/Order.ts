import { Schema, model, models } from "mongoose";

const OrderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    price: {
      type: Number,
      required: true,
    },
    
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [OrderItemSchema],

    totalAmount: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Order = models.Order || model("Order", OrderSchema);
