"use strict";

import { DataTypes, Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export default (sequelize: Sequelize) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      // Polymorphic association using assetType to decide the relationship
      Review.belongsTo(models.User, {
        foreignKey: "assetId",
        constraints: false,
        as: "seller",
        scope: {
          assetType: "SELLER",
        },
      });

      Review.belongsTo(models.Product, {
        foreignKey: "assetId",
        constraints: false,
        as: "product",
        scope: {
          assetType: "PRODUCT",
        },
      });

      // Reviewer association
      Review.belongsTo(models.User, {
        foreignKey: "reviewerId",
        as: "reviewer",
      });
    }

    static getAssetInclude(assetType: string) {
      if (assetType === "SELLER") {
        return { model: sequelize.models.User, as: "seller" };
      }
      if (assetType === "PRODUCT") {
        return { model: sequelize.models.Product, as: "product" };
      }
      return null;
    }
  }
  Review.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      reviewerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      assetId: { type: DataTypes.UUID, allowNull: false },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },
      comment: { type: DataTypes.TEXT, allowNull: true },
      assetType: {
        type: DataTypes.ENUM("PRODUCT", "SELLER"),
        allowNull: false,
        defaultValue: "PRODUCT",
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
    }
  );
  return Review;
};
