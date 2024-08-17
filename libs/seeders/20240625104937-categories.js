"use strict";
const categories = require("../libs/seed-data/categories.json");
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    const modifiedCategories = [];
    [...categories].forEach((category) => {
      modifiedCategories.push({
        ...category,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert("categories", modifiedCategories, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("categories", null, {});
  },
};
