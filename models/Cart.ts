import { Schema, models, model } from "mongoose";

const cartItemSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { _id: false }
);

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const Cart = models.Cart || model("Cart", CartSchema);