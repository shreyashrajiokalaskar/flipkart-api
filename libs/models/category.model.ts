"use strict";
import { DataTypes, Model } from "sequelize";
// import { sequelize } from "../configs/db-connection.config";
import { Sequelize } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  class Category extends Model {
    static associate(models: any) {
      // define association here
      Category.hasMany(models.Product, {
        foreignKey: "categoryId",
        as: "products",
      });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      category: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",

    }
  );
  return Category;
};
