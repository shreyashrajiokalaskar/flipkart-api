"use strict";
import { Model, Sequelize } from "sequelize";
export default (sequelize: Sequelize, DataTypes: any) => {
  class city extends Model {
    static associate(models: any) {
      city.hasMany(models.address,{
        foreignKey: 'cityId',
        as: "addresses"
      })
    }
  }
  city.init(
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
      modelName: "city",
    }
  );
  return city;
};
