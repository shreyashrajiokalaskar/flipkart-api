"use strict";
import { Model, Sequelize } from "sequelize";
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  city.init(
    {
      pincode: DataTypes.NUMBER,
      name: DataTypes.STRING,
      district: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "city",
    }
  );
  return city;
};
