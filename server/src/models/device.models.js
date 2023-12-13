const { model, Schema, default: mongoose } = require("mongoose");

const deviceSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    donarList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Device = model("Device", deviceSchema);

module.exports = { Device };
