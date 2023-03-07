import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db-connection.config';

export const CategoryModel = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4(),
      primaryKey: true,
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
