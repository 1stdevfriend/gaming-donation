const { model, Schema } = require("mongoose");

const donations = model(
  "donations",
  new Schema({
    name: String,
    amt: String,
    date: String,
    id: String,
  })
);

module.exports = { donations };
