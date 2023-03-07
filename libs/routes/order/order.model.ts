import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db-connection.config';

export const OrderModel = sequelize.define(
  'order',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    purchasedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      references: {
        model: 'products',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
