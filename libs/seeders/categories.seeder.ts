import { Category } from 'entities/category.entity';
import { DataSource } from 'typeorm';

export const seedCategories = async (dataSource: DataSource) => {
  console.log('Seeding Categores...');

  const categoryRepository = dataSource.getRepository(Category);

  const categories = [
    {
      "slug": "beauty",
      "name": "Beauty"
    },
    {
      "slug": "fragrances",
      "name": "Fragrances"
    },
    {
      "slug": "furniture",
      "name": "Furniture"
    },
    {
      "slug": "groceries",
      "name": "Groceries"
    },
    {
      "slug": "home-decoration",
      "name": "Home Decoration"
    },
    {
      "slug": "kitchen-accessories",
      "name": "Kitchen Accessories"
    },
    {
      "slug": "laptops",
      "name": "Laptops"
    },
    {
      "slug": "mens-shirts",
      "name": "Mens Shirts"
    },
    {
      "slug": "mens-shoes",
      "name": "Mens Shoes"
    },
    {
      "slug": "mens-watches",
      "name": "Mens Watches"
    },
    {
      "slug": "mobile-accessories",
      "name": "Mobile Accessories"
    },
    {
      "slug": "motorcycle",
      "name": "Motorcycle"
    },
    {
      "slug": "skin-care",
      "name": "Skin Care"
    },
    {
      "slug": "smartphones",
      "name": "Smartphones"
    },
    {
      "slug": "sports-accessories",
      "name": "Sports Accessories"
    },
    {
      "slug": "sunglasses",
      "name": "Sunglasses"
    },
    {
      "slug": "tablets",
      "name": "Tablets"
    },
    {
      "slug": "tops",
      "name": "Tops"
    },
    {
      "slug": "vehicle",
      "name": "Vehicle"
    },
    {
      "slug": "womens-bags",
      "name": "Womens Bags"
    },
    {
      "slug": "womens-dresses",
      "name": "Womens Dresses"
    },
    {
      "slug": "womens-jewellery",
      "name": "Womens Jewellery"
    },
    {
      "slug": "womens-shoes",
      "name": "Womens Shoes"
    },
    {
      "slug": "womens-watches",
      "name": "Womens Watches"
    }
  ] as Category[];

  await categoryRepository.insert(categories);
  console.log('Categores seeded successfully');
};
