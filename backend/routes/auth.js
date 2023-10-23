const router = require("express").Router();
const authController = require("../controller/auth");

router.post("/login", authController.loginHandler);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);

module.exports = router;
