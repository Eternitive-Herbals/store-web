import { Schema, models, model } from "mongoose";

const ingredientItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export const Ingredients =
  models.Ingredient || model("Ingredient", ingredientItemSchema);
