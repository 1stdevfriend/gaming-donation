const express = require("express");
const url = require("url");
const { Device } = require("../models/device.models");
const querystring = require("querystring");

const router = express.Router();

router.get("/get-fund", async (req, res) => {
  try {
    const device = req.headers["device"];
    const requestUrl = req.url;
    const parsedUrl = url.parse(requestUrl);
    const queryParams = querystring.parse(parsedUrl.query);
    if (queryParams?.device) {
      const deviceInfo = await Device.findOne({
        name: queryParams?.device,
      }).populate("donarList");
      res.status(200).json({
        message: "Device information",
        result: deviceInfo,
      });
    } else
      res
        .status(400)
        .json({ message: "Bad request, Device name is required in header" });
  } catch (error) {
    console.log(error?.message);
    res
      .status(400)
      .json({ data: null, message: "Something is wrong:" + error?.message });
  }
});

module.exports = router;
