const { body, validationResult } = require("express-validator");

exports.registerValidator = [
  body("username")
    .isLength({ min: 5, max: 20 })
    .withMessage("Username needs to be in 5 to 20 characters long"),
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
];

exports.updatePasswordValidator = [
  body("username")
    .isLength({ min: 5, max: 20 })
    .withMessage("Username needs to be in 5 to 20 characters long"),
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
];

exports.registerChecker = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  next();
};
