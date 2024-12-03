'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderProducts',   {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
        },
      },
      price: {
        type: Sequelize.FLOAT,
        validate: {
          min: 0.01,
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orderProducts');
  }
};