import { Schema,  model } from "mongoose";

const CartItemSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [CartItemSchema],
  },
  { timestamps: true },
);

export const Cart = model("Cart", CartSchema);
