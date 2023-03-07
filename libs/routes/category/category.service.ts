import { CategoryModel } from './category.model';

export const setCategories = async () => {
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
  categories.forEach(async (category: any) => {
    await CategoryModel.create({ name: category });
  });
};
