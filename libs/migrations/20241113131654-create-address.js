"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("addresses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      lane: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      landmark: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      cityId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "cities",
          key: "id",
        },
        onUpdate: "CASCADE", // Optional: Define behavior on update
        onDelete: "CASCADE", // Optional: Define behavior on delete
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("addresses");
  },
};
