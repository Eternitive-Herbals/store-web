import { Schema, model } from "mongoose";

const ContactItem = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  message: {
    type: String,
    require: true,
  },
});

export const Contact = model("Contact", ContactItem);
