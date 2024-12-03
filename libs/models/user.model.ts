"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/db-connection.config";
import { Sequelize } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
      User.hasMany(models.Address, {
        foreignKey: "userId",
        as: "addresses",
      });
      User.hasMany(models.Order, {
        foreignKey: "userId",
        as: "orders",
      });
      User.hasMany(models.Review, {
        foreignKey: "reviewerId",
        as: "reviews",
      });
      User.hasMany(models.Review, {
        foreignKey: "assetId",
        as: "sellerReviews",
        constraints: false,
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "role",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      paranoid: true,
      timestamps: true,
    }
  );
  return User;
};
