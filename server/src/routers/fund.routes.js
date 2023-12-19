import { Router } from "express";
import {
  getAllDeviceInfo,
  getFund,
  addDevices,
  deleteAllProducts,
} from "../controllers/fund.controller.js";

const router = Router();

router.route("/get-fund").get(getFund);
router.route("/all-devices").get(getAllDeviceInfo);
router.route("/add-devices").get(addDevices);
router.route("/delete-all").get(deleteAllProducts);

export default router;
