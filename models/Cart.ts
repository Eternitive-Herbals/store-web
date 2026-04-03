import { Schema, model } from "mongoose";

const CartItemSchema = new Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  description: { type: String, required: true },
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
      require: true,
    },
    items: [CartItemSchema],
  },
  { timestamps: true },
);

export const Cart = model("Cart", CartSchema);
