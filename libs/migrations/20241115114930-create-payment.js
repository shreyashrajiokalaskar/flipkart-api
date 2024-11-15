"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      method: {
        type: Sequelize.ENUM(
          "BANK_TRANSFER",
          "CREDIT_CARD",
          "EMI",
          "UPI",
          "COD"
        ),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("FAILED", "PENDING", "SUCCESS"),
        allowNull: false,
      },
      transactionId: { type: Sequelize.UUID, allowNull: false },
      gateway: { type: Sequelize.STRING, allowNull: false },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payments");
  },
};
