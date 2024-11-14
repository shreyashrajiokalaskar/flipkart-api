"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reviews", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      reviewerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      assetId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      assetType: {
        type: Sequelize.ENUM("PRODUCT", "SELLER"),
        allowNull: false,
        defaultValue: "PRODUCT",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reviews");
  },
};
