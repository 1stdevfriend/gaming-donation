const express = require("express");
const { Device } = require("../src/models/device.model");

const router = express.Router();

router.get("/get-all", [express.json()], async (req, res) => {
  try {
    const allDevices = await Device.find({});
    res.status(200).json({ data: allDevices });
  } catch (error) {
    console.log(error?.message);
    res
      .status(400)
      .json({ data: null, message: "Something is wrong:" + error?.message });
  }
});

module.exports = router;
