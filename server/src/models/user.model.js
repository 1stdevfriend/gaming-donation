import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  amt: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
});

const User = model("User", userSchema);

export { User };
