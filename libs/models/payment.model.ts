"use strict";

import { DataTypes, Model } from "sequelize";
import { PAYMENT_METHODS, PAYMENT_STATUS } from "../shared/common.enum";
import { Sequelize } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Payment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      method: {
        type: DataTypes.ENUM(...Object.values(PAYMENT_METHODS)),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(PAYMENT_STATUS)),
        allowNull: false,
      },
      transactionId: { type: DataTypes.UUID, allowNull: false },
      gateway: { type: DataTypes.STRING, allowNull: false },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payments",
      timestamps: true,
      paranoid: true,
    }
  );
  return Payment;
};
