import { Schema, model, models } from "mongoose";

const ReviewItemSchema = new Schema(
  {
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    image: { type: String },
  },
  { timestamps: true },
);

export const Review = models.Review || model("Review", ReviewItemSchema);

