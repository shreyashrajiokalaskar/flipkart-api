"use strict";

import { DataTypes, Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  class Address extends Model {
    static associate(models: any) {
      Address.belongsTo(models.City, {
        foreignKey: "cityId",
        as: "city",
      });
      Address.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      lane: { type: DataTypes.STRING, allowNull: false },
      landmark: { type: DataTypes.STRING, allowNull: true },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "id",
        },
      },
      cityId: {
        type: DataTypes.UUID,
        references: {
          model: "City",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "addresses",
    }
  );
  return Address;
};
