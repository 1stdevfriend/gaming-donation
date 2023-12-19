const express = require("express");
const { STRIPE_SK } = require("../config");
const stripe = require("stripe")(STRIPE_SK);

const router = express.Router();

router.post("/pay-now", [express.json()], async (req, res) => {
  try {
    const { amt, productName, productImage } = req.body;
    if (amt && productName && productImage) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: productName,
                description: "Donate for gaming community",
                images: [
                  productImage ||
                    "https://i.pcmag.com/imagery/reviews/04dRlD6i7f8OrAtbWbNfZoB-3.fit_scale.size_1028x578.v1569482971.jpg",
                ],
              },
              unit_amount: Math.round(Number(amt)) * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        // TODO:=> use in dev mode
        // success_url: `http://localhost:3000/stripe-redirect/success`,
        // cancel_url: `https://localhost:3000/stripe-redirect/cancel`,
        success_url: `https://xhunter.in/stripe-redirect/success`,
        cancel_url: `https://xhunter.in/stripe-redirect/cancel`,
      });
      res.status(200).json({ msg: "Checkout URL", data: session.url });
    } else res.status(404).json({ msg: "Some keys are missing", data: null });
  } catch (err) {
    console.log(err?.message);
    res
      .status(500)
      .json({ msg: "Internal server error:" + err?.message, data: null });
  }
});

module.exports = router;
