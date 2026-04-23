import { Schema, model, models } from "mongoose";

const ingredientItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export const Ingredients = models.Ingredients || model("Ingredient", ingredientItemSchema);
