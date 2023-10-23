const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const transactionRouter = require("./routes/transaction");

app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/transaction", transactionRouter);
app.use("/profile-picture", express.static(__dirname + "/public"));
app.use("/product-image", express.static(__dirname + "/public"));

// 404 Not Found route
app.use((req, res) => {
  console.error(`Not found: ${req.path}`);
  res.status(404).json({
    ok: false,
    message: "Route not found",
  });
});

// Middleware error
app.use((err, req, res, next) => {
  console.error(`FATAL ERROR: ${req.path}`);
  console.error(err);

  res.status(500).json({
    ok: false,
    message: "FATAL ERROR",
    error: String(err),
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Cashier app server runs at http://localhost:${PORT}`);
});
