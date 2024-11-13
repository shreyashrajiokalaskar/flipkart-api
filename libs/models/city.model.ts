"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../configs/db-connection.config";

class City extends Model {
  static associate(models: any) {
    City.hasMany(models.address, {
      foreignKey: "cityId",
      as: "addresses",
    });
  }
}
City.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "City",
  }
);
export { City };
