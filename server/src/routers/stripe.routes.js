import { Router } from "express";
import {
  handleStriperWebhook,
  handlePayNow,
} from "../controllers/stripe.controller.js";

const router = Router();

router.route("/webhook").post(handleStriperWebhook);
router.route("/pay-now").post(handlePayNow);

export default router;
