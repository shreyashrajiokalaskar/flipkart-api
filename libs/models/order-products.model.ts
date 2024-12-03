"use strict";

import { DataTypes, Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  class OrderProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      OrderProducts.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      OrderProducts.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "order",
      });
    }
  }
  OrderProducts.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Order",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Product",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        validate: {
          min: 0.01,
        },
      },
    },
    {
      sequelize,
      modelName: "OrderProducts",
      tableName: "orderProducts",
      timestamps: true,
      paranoid: true,
    }
  );
  return OrderProducts;
};
