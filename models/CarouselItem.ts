import { Schema, model, models } from "mongoose";

const CarouselItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },
    carouselImage: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CarouselItem =
  models.CarouselItem || model("CarouselItem", CarouselItemSchema);
