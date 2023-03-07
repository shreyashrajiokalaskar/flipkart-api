import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db-connection.config';
import { CategoryModel } from '../category/category.model';
import { ImageModel } from '../images/image.model';
import { TABLE_NAMES } from './../../constants/table-name.constants';

export const ProductModel = sequelize.define(
  TABLE_NAMES.PRODUCT,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CategoryModel,
        key: 'id',
      },
    },
    price: {
      type: DataTypes.INTEGER,
    },
    discountPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

ProductModel.hasOne(ImageModel);
