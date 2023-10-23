const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const userController = require("../controller/user");
const { multerUpload } = require("../lib/multer");
const authValidator = require("../validator/authValidator");

router.post(
  "/updateprofile",
  multerUpload.single("profilePicture"),
  authMiddleware.tokenValidator,
  userController.createAdmin
);

router.post(
  "/createadmin",
  userController.createAdmin,
)

router.patch(
  "/updatesettings",
  authMiddleware.tokenValidator,
  authValidator.updatePasswordValidator,
  userController.updateProfileSettings
);

router.delete(
  "/removeprofilepicture",
  authMiddleware.tokenValidator,
  userController.removeProfilePicture
);

module.exports = router;
 