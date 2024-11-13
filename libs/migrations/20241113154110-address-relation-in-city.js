"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Change 'id' column to be UUID with default value and primary key
    await queryInterface.changeColumn("cities", "id", {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    });

    // Change columns to be NOT NULL
    await queryInterface.changeColumn("cities", "pincode", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("cities", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("cities", "district", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("cities", "state", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Adding the foreign key constraint from 'address' to 'city'
    await queryInterface.addConstraint("addresses", {
      fields: ["cityId"],
      type: "foreign key",
      name: "fk_addresses_cityId", // Custom constraint name
      references: {
        table: "cities",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the foreign key constraint
    await queryInterface.removeConstraint("addresses", "fk_addresses_cityId");

    // Revert changes on the 'cities' table
    await queryInterface.changeColumn("cities", "id", {
      type: Sequelize.UUID,
      allowNull: true,
    });
    await queryInterface.changeColumn("cities", "pincode", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("cities", "name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("cities", "district", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("cities", "state", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
