// const { model, Schema, default: mongoose } = require("mongoose");
import { model, Schema } from "mongoose";

const deviceSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    donarList: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Device = model("Device", deviceSchema);

export { Device };
