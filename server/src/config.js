import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

const { STRIPE_SK, MONGO_URI, ENDPOINT_SECRET, PORT, CORS_ORIGIN } =
  process.env;

export { MONGO_URI, STRIPE_SK, ENDPOINT_SECRET, PORT, CORS_ORIGIN };
