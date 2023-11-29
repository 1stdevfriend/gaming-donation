require("dotenv").config();

const { STRIPE_SK, MONGO_URI, ENDPOINT_SECRET } = process.env;

module.exports = {
  mongoURI: MONGO_URI,
  STRIPE_SK,
  ENDPOINT_SECRET,
};
