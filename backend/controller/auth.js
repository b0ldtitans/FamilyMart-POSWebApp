const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const crypto = require("crypto");
const sendEmail = require("../utilities/email");
const { Op } = require("sequelize");

exports.loginHandler = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    return res.status(400).json({
      ok: false,
      message: "Username or Password is incorrect",
    });
  }

  const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      ok: false,
      message: "Username or Password is incorrect",
    });
  }

  const payload = {
    id: user.id,
    role: user.role,
    username: user.username,
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.json({
    ok: true,
    data: {
      token,
      id: user.id,
      role: user.role,
      username: user.username,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  });
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Email Not Found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpired = new Date();
    resetTokenExpired.setTime(resetTokenExpired.getTime() + 10 * 60 * 1000);
    await User.update(
      {
        resetToken: resetTokenHash,
        resetTokenExpired,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    );

    const resetUrl = `${req.protocol}://localhost:3000/reset-password/${resetTokenHash}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}\nIf you didn't forget your password, please ignore this email!`;
    try {
      await sendEmail({
        email: user.email,
        subject: "FamilyMart POS Account Password Reset",
        message,
      });
      res.status(200).json({
        ok: true,
        resetToken: resetToken,
        hashedToken: resetTokenHash,
      });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      res.status(500).json({
        ok: false,
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({
      ok: false,
      message: "Internal Server Error",
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  try {
    const user = await User.findOne({
      where: {
        resetToken: req.params.token,
        resetTokenExpired: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "Token is invalid or has expired",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        ok: false,
        message: "Passwords do not match",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpired = null;

    await user.save();

    res.status(200).json({
      ok: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({
      ok: false,
      message: "Internal Server Error",
    });
  }
};

