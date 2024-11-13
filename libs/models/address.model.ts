"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/db-connection.config";

class Address extends Model {
  static associate(models: any) {
    Address.belongsTo(models.city, {
      foreignKey: "cityId",
      as: "city",
    });
    Address.belongsTo(models.user, {
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
    modelName: "Address",
  }
);

export { Address };
