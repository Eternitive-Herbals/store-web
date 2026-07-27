import { Schema, model, models } from "mongoose";

const BlogItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
});

export const Blog =   models.Blog ||model("Blog", BlogItemSchema);
