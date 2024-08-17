"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("roles", {
      fields: ["role"],
      type: "unique",
      name: "unique_role_constraint", // Choose a name for the constraint
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("roles", "unique_role_constraint");
  },
};
