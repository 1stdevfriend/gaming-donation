const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SK);

const router = express.Router();

router.post("/paynow", async (req, res) => {
  const response = { msg: "", code: 400 };
  try {
    const { amount, name, date } = req.body;
    if (amount && name && date) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "Gaming fund",
                description: "Contribute for gaming community",
              },
              unit_amount: Math.round(Number(amount)) * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${serverHost}/stripe-redirect/success?pid=${projectIdentifier}`,
        cancel_url: `${serverHost}/stripe-redirect/cancel`,
      });
      res.status(200).json({ msg: "Checkout URL", data: session.url });
    } else res.status(404).json({ msg: "Some keys are missing", data: null });
  } catch (err) {
    console.log(err?.message);
    response["code"] = 500;
    response["msg"] = "Internal server error";
  }
  res.status(response["code"]).json(response);
});

module.exports = router;
