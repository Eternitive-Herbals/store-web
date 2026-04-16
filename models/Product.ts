import { Schema, model, models } from "mongoose";

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
    category: [
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
  },
  { timestamps: true },
);

export const Product = models.Product || model("Product", ProductItemSchema);
