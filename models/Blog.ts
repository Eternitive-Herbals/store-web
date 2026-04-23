import { Schema, model, models } from "mongoose";

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

export const Blog =   models.Blog ||model("Blog", BlogItemSchema);
