import { DataTypes } from 'sequelize';
import {sequelize}  from '../../configs/db-connection.config';
import { TABLE_NAMES } from '../../constants/table-name.constants';

export const ReviewModel = sequelize.define(
  TABLE_NAMES.REVIEW,
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    product: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    reviewer: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
