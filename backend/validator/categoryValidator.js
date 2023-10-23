const { body, validationResult } = require("express-validator");

exports.validateCategory = [
  body("name")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name should be in between 3 and 100 characters"),
  body("description")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Category description should be in between 3 and 100 characters"
    ),
];

exports.applyCategoryValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({
      ok: false,
      message: "Failed category validation",
      errors: result.errors,
    });

    return;
  }

  next();
};
