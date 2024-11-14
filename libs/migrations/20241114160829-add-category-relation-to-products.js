'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'fk_products_categoryId',
      references: {
        table: "categories",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("products", "fk_products_categoryId");
  }
};
