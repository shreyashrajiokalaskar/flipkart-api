"use strict";

import { DataType, DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
  class address extends Model {
    static associate(models: any) {
      address.belongsTo(models.city, {
        foreignKey: "cityId",
        as: "city",
      });
      address.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  address.init(
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
          model: "users",
          key: "id",
        },
      },
      cityId: {
        type: DataTypes.UUID,
        references: {
          model: "cities",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "address",
    }
  );
  return address;
};
