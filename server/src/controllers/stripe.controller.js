import Stripe from "stripe";

import { User } from "../models/user.model.js";
import { Device } from "../models/device.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { STRIPE_SK, ENDPOINT_SECRET } from "../config.js";
import { getStripeProductData } from "../utils/util.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const stripe = new Stripe(STRIPE_SK);
let id = null;

const handleStriperWebhook = asyncHandler(async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    let event = stripe.webhooks.constructEvent(req.body, sig, ENDPOINT_SECRET);
    if (id !== event?.data?.object?.id) {
      id = event?.data?.object?.id;
      switch (event?.type) {
        case "checkout.session.completed": {
          stripe.checkout.sessions.retrieve(
            event?.data?.object?.id,
            { expand: ["line_items"] },
            webhookHelper.bind(this, event)
          );
          break;
        }
      }
    }
    res.send(200);
  } catch (error) {
    res.send(200);
  }
});

const handlePayNow = asyncHandler(async (req, res) => {
  try {
    const { amt, productName, productImage } = req.body;
    if (amt && productName && productImage) {
      const session = await stripe.checkout.sessions.create(
        getStripeProductData({ amt, productName, productImage })
      );
      res.status(200).json(new ApiResponse(200, session.url, "Checkout URL"));
    } else throw new ApiError(400, "Bad request, Some keys are missing");
  } catch (err) {
    throw new ApiError(500, "Internal server error:" + err?.message);
  }
});

async function webhookHelper(event, err, session) {
  try {
    if (err) {
      console.error(err);
    } else {
      const lineItems = session?.line_items.data;
      const dataObj = event?.data?.object;
      const insertedUser = await User.collection.insertOne({
        name: dataObj?.name || dataObj?.customer_details?.name,
        amt: (lineItems[0]?.amount_total / 100).toFixed(2),
        date: new Date(dataObj?.created * 1000).toLocaleString().split(",")[0],
        id: dataObj.id,
      });
      if (insertedUser.insertedId.toString()) {
        const result = await Device.collection.updateOne(
          { name: lineItems[0]?.description },
          {
            $addToSet: {
              donarList: insertedUser.insertedId.toString(),
            },
          }
        );
      }
    }
  } catch (error) {
    console.log(error?.message);
  }
}

export { handleStriperWebhook, handlePayNow };
