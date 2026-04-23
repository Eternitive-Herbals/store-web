import { Schema,  model, models } from "mongoose";

const categoryItemSchema = new Schema({
  name: { type: String, required: true },
});

export const Category = models.Category || model("Category", categoryItemSchema);
