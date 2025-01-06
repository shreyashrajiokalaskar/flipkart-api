import { Category } from "entities/category.entity";

export class CategoryService {
  public static setCategories = async () => {
    const categories = [
      'mens-shoes',
      'motorcycle',
      'lighting',
      'womens-bags',
      'automotive',
      'sunglasses',
      'furniture',
      'womens-watches',
      'womens-shoes',
      'womens-dresses',
      'mens-watches',
      'mens-shirts',
      'womens-jewellery',
      'tops',
    ];
    await Promise.all(
      categories.map((category) => Category.create({ name: category }))
    );
  };
}