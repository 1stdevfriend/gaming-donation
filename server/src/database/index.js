const mongoose = require("mongoose");
const config = require("../config");

async function createConnectionPool() {
  const mongoURI = config.mongoURI;
  if (!mongoURI) return;
  try {
    console.log("Connecting to database........");
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected To Database");
  } catch (err) {
    console.log("Error during connecting with DB");
    console.error(err.message);
  }
}

module.exports = { createConnectionPool };
