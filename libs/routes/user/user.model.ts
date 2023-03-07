import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db-connection.config';
import { TABLE_NAMES } from '../../constants/table-name.constants';

export const UserModel = sequelize.define(
  TABLE_NAMES.USER,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ['[a-z]', 'i'], // will only allow letters
        max: 10,
        min: 2,
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ['[a-z]', 'i'], // will only allow letters
        max: 10,
        min: 2,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['USER', 'ADMIN']],
      },
      defaultValue: 'USER',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetToken: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    resetTokenExpires: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
