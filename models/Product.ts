import { Schema, models, model } from "mongoose";

const ProductItemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false },
);

const ProductSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: { type: [ProductItemSchema], default: [] },
  },
  { timestamps: true },
);

export const Product = models.Product || model("Product", ProductSchema);
