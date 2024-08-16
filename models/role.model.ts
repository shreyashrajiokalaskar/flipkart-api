"use strict";
import { Model } from "sequelize";
export default (sequelize: any, DataTypes: { STRING: any; }) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }

  Role.init(
    {
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
