"use strict";
import { DataTypes, Model } from "sequelize";
export default (sequelize: any) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      Role.hasMany(models.user, {
        foreignKey: 'roleId',
        as: 'role'
      })
    }
  }

  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "role",
    }
  );
  return Role;
};
