import { Schema, models, model } from "mongoose";

const ProductItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ingredient",
        required: true,
      },
    ],
    price: { type: Number, required: true },
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    dosage: { type: String, required: true },
    goal: [
      {
        type: Schema.Types.ObjectId,
        ref: "Goal",
        required: true,
      },
    ],
    image: { type: String, require: true },
    location: {
      type: String,
      enum: ["right", "left", "bottom"],
    },
  },
  { timestamps: true },
);

export const Product = models.Product || model("Product", ProductItemSchema);
