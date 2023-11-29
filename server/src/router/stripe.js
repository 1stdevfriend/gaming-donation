const express = require("express");
// const { checkoutUser } = require("../database/schemas/checkout.user");
const { STRIPE_SK, ENDPOINT_SECRET } = require("../config");
const { checkoutUser } = require("../database/schemas/checkout.user");
const stripe = require("stripe")(STRIPE_SK);

const router = express.Router();

let id = null;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    try {
      console.log("-------------hit-1--------");
      const sig = request.headers["stripe-signature"];
      let event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        ENDPOINT_SECRET
      );
      if (id !== event?.data?.object?.id) {
        console.log("-------------hit-2--------", event?.type);
        id = event?.data?.object?.id;
        switch (event?.type) {
          case "checkout.session.completed": {
            console.log("-------------hit-3-------------");
            stripe.checkout.sessions.retrieve(
              event?.data?.object?.id,
              { expand: ["line_items"] },
              async function (err, session) {
                if (err) {
                  console.error("err------>", err);
                } else {
                  console.log("-------------hit-4-------------------");
                  const dataObj = event?.data?.object;
                  const lineItems = session?.line_items.data;
                  await checkoutUser.collection.insertOne({
                    name: dataObj?.name || dataObj?.customer_details?.name,
                    amt: (lineItems[0]?.amount_total / 100).toFixed(2),
                    date: new Date(dataObj?.created * 1000)
                      .toLocaleString()
                      .split(",")[0],
                    id: dataObj.id,
                  });
                }
              }
            );
          }
        }
      }
      response.send();
    } catch (error) {
      console.log(error?.message);
      response.send();
    }
  }
);

module.exports = router;
