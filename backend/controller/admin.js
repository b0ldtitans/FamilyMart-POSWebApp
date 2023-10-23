const { User } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.createNewCashier = async (req, res, next) => {
  const { username, password, name, email } = req.body;
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username: username }],
    },
  });

  if (existingUser) {
    return res.status(400).json({
      ok: false,
      message: "Username already exists",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = await User.create({
    username,
    password: hashedPassword,
    name,
    email,
    role: "cashier",
  });

  return res.json({
    ok: true,
    data: {
      username: newUser.username,
      name: newUser.name,
    },
  });
};

exports.deleteCashier = async (req, res, next) => {
  const { username } = req.params;
  const cashier = await User.findOne({ where: { username } });

  if (!cashier) {
    return res.status(404).json({
      ok: false,
      message: "Cashier not found",
    });
  }

  await cashier.destroy();

  return res.json({
    ok: true,
    message: "Cashier deleted successfully",
  });
};

exports.toggleCashierStatus = async (req, res, next) => {
  const { username } = req.params;
  const cashier = await User.findOne({ where: { username } });

  if (!cashier) {
    return res.status(404).json({
      ok: false,
      message: "Cashier not found",
    });
  }

  cashier.isActive = !cashier.isActive; // Toggle the isActive state
  await cashier.save();

  const statusMessage = cashier.isActive
    ? "Cashier activated successfully"
    : "Cashier deactivated successfully";

  return res.json({
    ok: true,
    message: statusMessage,
  });
};

exports.getAllCashiers = async (req, res, next) => {
  const cashiers = await User.findAll({
    where: { role: "cashier" },
    attributes: ["username", "name", "email", "isActive"],
  });

  return res.json({
    ok: true,
    data: cashiers,
  });
};

exports.getCashier = async (req, res, next) => {
  const { username } = req.params;
  const cashier = await User.findOne({
    where: { username, role: "cashier" },
    attributes: ["username", "name", "email", "isActive"],
  });

  if (!cashier) {
    return res.status(404).json({
      ok: false,
      message: "Cashier not found",
    });
  }

  return res.json({
    ok: true,
    data: cashier,
  });
};
