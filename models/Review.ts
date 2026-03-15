import { Schema, models, model } from "mongoose";

const ReviewItemSchema = new Schema(
  {
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

export const Review = models.Review || model("Review", ReviewItemSchema);
 