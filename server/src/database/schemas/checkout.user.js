const { model, Schema } = require("mongoose");

const checkoutUser = model(
  "checkoutUser",
  new Schema({
    id: Number,
    name: String,
    amt: Number,
    date: Date,
  })
);

module.exports = { checkoutUser };
