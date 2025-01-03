import { DataTypes } from 'sequelize';
import  {sequelize}  from '../../configs/db-connection.config';

export const ImageModel = sequelize.define(
  'image',
  {
    productId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      // references: {
      //   model: ProductModel,
      //   key: 'id',
      // },
    },
    images: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    timestamps: false,
  }
);
