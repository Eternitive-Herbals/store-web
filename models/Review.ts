import { Schema, model } from "mongoose";

const ReviewItemSchema = new Schema(
  {
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

export const Review = model("Review", ReviewItemSchema);
