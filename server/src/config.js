require("dotenv").config();

const { REDIS_HOST, REDIS_PORT, MONGO_URI } = process.env;

module.exports = {
  mongoURI: MONGO_URI,
};
