const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const categoryController = require("../controller/category");
const categoryValidator = require("../validator/categoryValidator");

router.get(
  "/",
  categoryController.handleGetCategories
);
router.get(
  "/:id",
  categoryController.handleGetCategoryById
)
router.post(
  "/",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  categoryValidator.validateCategory,
  categoryValidator.applyCategoryValidation,
  categoryController.handleAddCategory
);
router.put(
  "/:id",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  categoryController.handleEditCategory
);
router.patch(
  "/:id",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  categoryController.handleEditCategory
)
router.delete(
  "/:id",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  categoryController.handleDeleteCategory
);

module.exports = router;
