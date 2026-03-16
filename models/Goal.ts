import { Schema,  model } from "mongoose";

const goalItemSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export const Goal = model("Goal", goalItemSchema);
