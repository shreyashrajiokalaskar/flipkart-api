import { DataTypes } from "sequelize";
import  {sequelize}  from "../../configs/db-connection.config";
import { TABLE_NAMES } from "../../constants/table-name.constants";

export const DummyModel = sequelize.define(TABLE_NAMES.ROLE, {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
