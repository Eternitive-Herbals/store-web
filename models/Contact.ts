import { Schema, model , models } from "mongoose";

const ContactItem = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
});

export const Contact = models.Contact || model("Contact", ContactItem);
