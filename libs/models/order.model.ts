"use strict";

import { DataTypes, Model } from "sequelize";
import { ORDER_STATUS } from "../shared/common.enum";
import { Sequelize } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Order.belongsTo(models.Address, {
        foreignKey: "addressId",
        as: "address",
      });
      Order.hasMany(models.Payment, {
        foreignKey: "paymentId",
        as: "payment",
      });

      Order.belongsToMany(models.Product, {
        through: "OrderProducts",
        foreignKey: "orderId",
        otherKey: "productId",
        as: "products",
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
          model: "User",
          key: "id",
        },
      },
      addressId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Address",
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
          model: "Payment",
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
      modelName: "Order",
      tableName: "orders",
      timestamps: true,
      paranoid: true,
    }
  );

  return Order;
};
