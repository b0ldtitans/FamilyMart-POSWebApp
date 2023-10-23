const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const authValidator = require("../validator/authValidator");
const adminController = require("../controller/admin");
const { multerUpload } = require("../lib/multer");

router.post(
  "/new_cashier",
  multerUpload.single("profilePicture"),
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  authValidator.registerChecker,
  authValidator.registerValidator,
  adminController.createNewCashier
);

router.delete(
  "/delete_cashier/:username",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  adminController.deleteCashier
);

router.patch(
  "/cashier_toggler/:username",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  adminController.toggleCashierStatus
);

router.get(
  "/cashiers",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  adminController.getAllCashiers
);

module.exports = router;
