require("dotenv").config();

const { REDIS_HOST, REDIS_PORT, MONGO_URI } = process.env;

module.exports = {
  databaseConfig: {
    redisHost: REDIS_HOST,
    redisPort: REDIS_PORT,
    mongoURI: MONGO_URI,
  },
};
