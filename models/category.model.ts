"use strict";
import { Model, Sequelize } from "sequelize";
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  category.init(
    {
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      category: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "category",
    }
  );
  return category;
};
