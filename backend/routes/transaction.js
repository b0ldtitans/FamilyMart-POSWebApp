const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const transactionController = require("../controller/transaction");

router.post(
  "/new",
  authMiddleware.tokenValidator,
  transactionController.handleNewTransaction
);

router.get(
  "/all",
  authMiddleware.tokenValidator,
  transactionController.getAllTransaction
);

router.get(
  "/:id",
  authMiddleware.tokenValidator,
  transactionController.getTransactionById
);

router.get(
  "/user/:id",
  authMiddleware.tokenValidator,
  transactionController.getTransactionByCashierId
);

module.exports = router;
