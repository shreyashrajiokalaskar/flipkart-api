"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/db-connection.config";
import { PAYMENT_METHODS, PAYMENT_STATUS } from "../shared/common.enum";

class payment extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
}
payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM(
        PAYMENT_METHODS.BANK_TRANSFER,
        PAYMENT_METHODS.CREDIT_CARD,
        PAYMENT_METHODS.EMI,
        PAYMENT_METHODS.UPI,
        PAYMENT_METHODS.COD
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        PAYMENT_STATUS.FAILED,
        PAYMENT_STATUS.PENDING,
        PAYMENT_STATUS.SUCCESS
      ),
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
    modelName: "payment",
    timestamps: true,
    paranoid: true,
  }
);
export { payment };
