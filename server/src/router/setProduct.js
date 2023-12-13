const express = require("express");
const { Device } = require("../models/device.models");

const router = express.Router();

router.post("/set-device", [express.json()], async (req, res) => {
  try {
    const { productList } = req.body;
    if (productList?.length > 0) {
      const result = await Device.insertMany(productList);
      res.status(200).json({ message: "Successfully inserted", result });
    } else res.status(400).json({ message: "Bad request invalid payload" });
  } catch (error) {
    console.log(error?.message);
    res.status(500).json({ data: null, message: "ERROR:" + error?.message });
  }
});

router.delete("/delete-all", [express.json()], async (req, res) => {
  try {
    const result = await Device.deleteMany({});
    res.status(200).json({ message: "Successfully deleted all data", result });
  } catch (error) {
    console.log(error?.message);
    res.status(500).json({ data: null, message: "ERROR:" + error?.message });
  }
});

module.exports = router;
