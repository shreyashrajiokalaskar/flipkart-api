"use strict";
const categories = [
  {
    "slug": "beauty",
    "category": "Beauty"
  },
  {
    "slug": "fragrances",
    "category": "Fragrances"
  },
  {
    "slug": "furniture",
    "category": "Furniture"
  },
  {
    "slug": "groceries",
    "category": "Groceries"
  },
  {
    "slug": "home-decoration",
    "category": "Home Decoration"
  },
  {
    "slug": "kitchen-accessories",
    "category": "Kitchen Accessories"
  },
  {
    "slug": "laptops",
    "category": "Laptops"
  },
  {
    "slug": "mens-shirts",
    "category": "Mens Shirts"
  },
  {
    "slug": "mens-shoes",
    "category": "Mens Shoes"
  },
  {
    "slug": "mens-watches",
    "category": "Mens Watches"
  },
  {
    "slug": "mobile-accessories",
    "category": "Mobile Accessories"
  },
  {
    "slug": "motorcycle",
    "category": "Motorcycle"
  },
  {
    "slug": "skin-care",
    "category": "Skin Care"
  },
  {
    "slug": "smartphones",
    "category": "Smartphones"
  },
  {
    "slug": "sports-accessories",
    "category": "Sports Accessories"
  },
  {
    "slug": "sunglasses",
    "category": "Sunglasses"
  },
  {
    "slug": "tablets",
    "category": "Tablets"
  },
  {
    "slug": "tops",
    "category": "Tops"
  },
  {
    "slug": "vehicle",
    "category": "Vehicle"
  },
  {
    "slug": "womens-bags",
    "category": "Womens Bags"
  },
  {
    "slug": "womens-dresses",
    "category": "Womens Dresses"
  },
  {
    "slug": "womens-jewellery",
    "category": "Womens Jewellery"
  },
  {
    "slug": "womens-shoes",
    "category": "Womens Shoes"
  },
  {
    "slug": "womens-watches",
    "category": "Womens Watches"
  }
]
;
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
