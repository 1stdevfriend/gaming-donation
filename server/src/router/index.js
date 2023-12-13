const express = require("express");

const router = express.Router();

const paynowRouter = require("./paynow");
const stripeRouter = require("./stripe");
const fundRouter = require("./fund");

// for admin to set list od devices
const setProductRouter = require("./setProduct");
// for debugging it will return all the devices info
const getAllRouter = require("./getAll");

router.use(paynowRouter);
router.use(stripeRouter);
router.use(fundRouter);
router.use(setProductRouter);
router.use(getAllRouter);

router.get("/", (_, res) => {
  res.status(200).json({ msg: "Server is running", data: null });
});

module.exports = router;
