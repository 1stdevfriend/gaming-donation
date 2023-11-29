const express = require("express");

const router = express.Router();

const paynowRouter = require("./paynow");

router.use(paynowRouter);

router.get("/", (_, res) => {
  res.status(200).json({ msg: "Server is running", data: null });
});

module.exports = router;
