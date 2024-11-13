"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/db-connection.config";

class Category extends Model {
  static associate(models: any) {
    // define association here
  }
}
Category.init(
  {
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    Category: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "Category",
  }
);
export { Category };
