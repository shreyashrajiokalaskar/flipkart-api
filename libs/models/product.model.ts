"use strict";

import { DataTypes, Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      console.log("models", models);
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
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
          model: "Category",
          key: "id",
        },
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      stock: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        validate: {
          min: 1,
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );

  return Product;
};
