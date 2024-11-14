"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/db-connection.config";

class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
}
Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: "category",
        key: "id",
      },
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      },
    },
    discountPercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        max: 100,
        min: 0,
      },
    },
    minOrderQuantity: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: 1,
      validate: {
        min: 1,
        isInt: true,
      },
    }
  },
  {
    sequelize,
    modelName: "Product",
  }
);
export { Product };
