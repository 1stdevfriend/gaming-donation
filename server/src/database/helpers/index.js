const mongoose = require("mongoose");
const config = require("../../config");

function createConnectionPool() {
  const mongoURI = config.mongoURI;
  if (!mongoURI) return;
  try {
    console.log("Connected To Database");
    return mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("Error during connecting with DB");
    console.error(err.message);
  }
}

module.exports = { createConnectionPool };
