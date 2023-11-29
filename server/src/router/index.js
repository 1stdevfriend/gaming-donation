const express = require("express");

const router = express.Router();

const paynowRouter = require("./paynow");
const stripeRouter = require("./stripe");
const fundRouter = require(".//fund");

router.use(paynowRouter);
router.use(stripeRouter);
router.use(fundRouter);

router.get("/", (_, res) => {
  res.status(200).json({ msg: "Server is running", data: null });
});

module.exports = router;
