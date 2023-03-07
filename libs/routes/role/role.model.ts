import { TABLE_NAMES } from './../../constants/table-name.constants';
import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db-connection.config';

export const RoleModel = sequelize.define(
  TABLE_NAMES.ROLE,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);
