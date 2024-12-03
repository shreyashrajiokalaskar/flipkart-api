"use strict";
import { DataTypes, Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  class City extends Model {
    static associate(models: any) {
      City.hasMany(models.Address, {
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
      tableName: "cities",

    }
  );

  return City;
};
