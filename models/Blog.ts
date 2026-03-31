import { Schema, model } from "mongoose";

const BlogItemSchema = new Schema({
  title: {
    type: String,
    require: true,
  },

  content: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
});

export const Blogs = model("Blog", BlogItemSchema);
