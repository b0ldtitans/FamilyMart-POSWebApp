"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Transaction.belongsTo(models.Product, {
      //   foreignKey: "transactionId",
      // });
      Transaction.hasMany(models.TransactionItem, {
        foreignKey: "transactionId",
      });
      Transaction.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Transaction.init(
    {
      totalPrice: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      transactionDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
