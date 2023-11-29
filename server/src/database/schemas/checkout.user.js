const { model, Schema } = require("mongoose");

const checkoutUser = model(
  "checkoutUser",
  new Schema({
    name: String,
    amt: String,
    date: String,
    id: String,
  })
);

module.exports = { checkoutUser };
