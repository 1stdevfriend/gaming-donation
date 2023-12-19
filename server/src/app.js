import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.on("error", (error) => {
  console.log(`App is not initialized ${error}`);
  process.exit(1);
});

// routes import
import fundRouter from "./routers/fund.routes.js";
import stripeRouter from "./routers/stripe.routes.js";

// routes declaration
app.use("/api/v1/", (req, res) => {
  res.status(200).json(new ApiResponse(200));
});
app.use("/api/v1/fund", fundRouter);
app.use("/api/v1/stripe", stripeRouter);

export { app };
