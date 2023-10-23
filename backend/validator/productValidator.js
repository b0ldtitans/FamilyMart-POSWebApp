const { body, validationResult } = require("express-validator");

const priceSanitizer = (value, { req }) => {
  return parseInt(value, 10);
};

exports.newProductValidator = async (req, res, next) => {
  body("productName")
    .isLength({ min: 5, max: 50 })
    .withMessage("Product name must be 5 to 50 characters long");
  body("productPrice")
    .customSanitizer(priceSanitizer)
    .isInt()
    .withMessage("Event Price must be an integer");
  body("CategoryId").isInt({ min: 1, max: 100 });
  body("description").isLength({ min: 5, max: 100 });
};

exports.productListingValidator = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  next();
};
