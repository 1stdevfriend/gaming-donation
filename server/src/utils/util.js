const getStripeProductData = ({ amt, productName, productImage }) => {
  return {
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
  };
};

export { getStripeProductData };
