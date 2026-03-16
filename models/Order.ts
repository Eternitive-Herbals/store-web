import { Schema,  model } from "mongoose";

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

export const Order = model("Order", OrderSchema);
