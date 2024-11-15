"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/db-connection.config";
import { ORDER_STATUS } from "../shared/common.enum";

class Order extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Order.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
    Order.belongsTo(models.address, {
      foreignKey: "addressId",
      as: "address",
    });
    Order.hasMany(models.payment, {
      foreignKey: "paymentId",
      as: "payment",
    });
  }
}
Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "address",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ORDER_STATUS)),
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "payment",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    modelName: "order",
    timestamps: true,
    paranoid: true,
  }
);
export { Order };
