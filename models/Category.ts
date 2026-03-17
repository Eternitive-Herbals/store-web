import { Schema,  model } from "mongoose";

const categoryItemSchema = new Schema({
  name: { type: String, required: true },
});

export const Category = model("Category", categoryItemSchema);
