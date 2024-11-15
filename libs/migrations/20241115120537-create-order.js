"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      addressId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "addresses",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM(
          "PLACED",
          "CONFIRMED",
          "PROCESSING",
          "SHIPPED",
          "OUT_FOR_DELIVERY",
          "DELIVERED",
          "RETURN_REQUESTED",
          "RETURNED",
          "REFUNDED",
          "CANCELLED",
          "FAILED"
        ),
        allowNull: false,
      },
      paymentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "payments",
          key: "id",
        },
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
