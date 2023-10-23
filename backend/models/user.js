"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // /**
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    //  */
    static associate(models) {
      User.hasMany(models.Transaction, {
        foreignKey: "userId",
        as: "transactionData",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "cashier"),
      isActive: DataTypes.BOOLEAN,
      resetToken: DataTypes.STRING,
      resetTokenExpired: DataTypes.DATE,
      passwwordUpdatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
