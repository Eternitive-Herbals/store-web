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
    images: {
      type: [String],
      validate: [
        (val: string[]) => val.length <= 4,
        "A product must have a maximum of 4 images",
      ],
    },
    image: { type: String }, // For backwards compatibility
  },
  { timestamps: true },
);

export const Product = models.Product || model("Product", ProductItemSchema);
