const { User } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize")

exports.updateProfilePicture = async (req, res) => {
  const userId = req.user.id;
  const profilePicture = req.file.filename;

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ ok: false, message: "User not found" });
    return;
  }

  user.profilePicture = profilePicture;
  await user.save();

  res.json({
    ok: true,
    data: user.profilePicture,
    message: "Profile Picture Successfully Uploaded",
  });
};

exports.updateProfileSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newPassword, email, username } = req.body;

    // Find the user by their ID
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    // Verify the current password

    // Update the user settings
    if (newPassword) {
      // If a new password is provided, hash and save it
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      user.password = hashedPassword;
    }

    if (email) {
      user.email = email;
    }

    if (username) {
      user.username = username;
    }

    // Save the updated user
    await user.save();

    return res.json({
      ok: true,
      status: 200,
      message: "Profile Settings Successfully Updated",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

exports.removeProfilePicture = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ ok: false, message: "User not found" });
    return;
  }

  user.profilePicture = null;
  await user.save();

  res.json({
    ok: true,
    data: user.profilePicture,
    message: "Profile Picture Successfully Removed",
  });
}; 

exports.createAdmin = async (req, res) => {
  const { username, password, name, email } = req.body;
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{username: username}],
    }
  })

  if(existingUser) {
    return res.status(400).json({
      ok: false,
      message: "Username already exists"
    })
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = await User.create ({
    username,
    password: hashedPassword,
    name,
    email,
    role: "admin"
  })

  return res.json({
    ok: true,
    data: {
      username: newUser.username,
      name: newUser.name
    }
  })
}