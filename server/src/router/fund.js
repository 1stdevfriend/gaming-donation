const express = require("express");
const { checkoutUser } = require("../database/schemas/checkout.user");
const { STRIPE_SK } = require("../config");

const router = express.Router();

router.get("/get-fund", [express.json()], async (req, res) => {
  try {
    const totalAmt = await checkoutUser.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $toDouble: "$amt",
            },
          },
        },
      },
    ]);
    const documents = await checkoutUser?.find({});
    res.status(200).json({ totalAmt: totalAmt[0]?.total, documents });
  } catch (error) {
    console.log(error?.message);
    res
      .status(400)
      .json({ data: null, message: "Something is wrong:" + error?.message });
  }
});

module.exports = router;
