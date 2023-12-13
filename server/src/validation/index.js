const { body } = require("express-validator");

const validatePayNowPayload = () => (
  body("amt").notEmpty(),
  body("productName").notEmpty(),
  body("productImage").notEmpty()
);

module.exports = { validatePayNowPayload };
