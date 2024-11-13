"use strict";
import { Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      User.belongsTo(models.role, { foreignKey: "roleId", as: "role" });
      User.hasMany(models.address, {
        foreignKey: 'userId',
        as: 'addresses'
      })
    }
  }

  User.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4, },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      paranoid: true,
      timestamps: true,
    }
  );
  return User;
};
