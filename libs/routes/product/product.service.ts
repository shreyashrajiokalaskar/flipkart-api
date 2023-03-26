import axios from 'axios';
import { DataTypes, Op } from 'sequelize';
import handler from '../../controllers/handler.factory';
import { APIModifier } from '../../utils/api-features.util';
import { CategoryModel } from '../category/category.model';
import { ImageModel } from '../images/image.model';
import { ProductModel } from './product.model';

const getDummyProducts = async () => {
  try {
    const products = await axios.get(
      'https://dummyjson.com/products?skip=30&limit=100',
      {
        headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' },
      },
    );
    products.data.products.forEach(async (product: any) => {
      delete product.id;
      const category = await CategoryModel.findOne({
        where: { name: product.category },
      });
      const { images } = product;
      product.category = category?.dataValues.id;
      delete product.thumbnail;
      delete product.images;
      const productCreated = (await setDummyProducts(product)) as any;
      const { id } = productCreated;
      await ImageModel.create({
        productId: id,
        images,
      });
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

const setDummyProducts = async (product: any) => {
  try {
    return await ProductModel.create(product);
  } catch (error: any) {
    throw new Error(error);
  }
};

const getProducts = async (filterParams?: any) => {
  try {
    const features = new APIModifier(filterParams)
      .sort()
      .limitFields()
      .paginate().filterClause;

    const { searchString = '' } = filterParams;
    const whereClause = {} as any;
    if (filterParams.id) whereClause['id'] = filterParams.id;
    return await ProductModel.findAll({
      include: ImageModel,
      where: {
        title: {
          [Op.iLike]: `%${searchString}%`,
        },
        ...whereClause,
      },
      ...features,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

const getProductById = handler.getOne(ProductModel, {
  path: 'reviews',
});
// async (id: string) => {
//   try {
//     return await ProductCollection.ProductModel.find({ _id: id }).populate(
//       'reviews'
//     );
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

const getProductStats = async () => {
  try {
    // return await ProductModel.aggregate([
    //   {
    //     $match: { rating: { $gte: 4.5 } },
    //   },
    //   {
    //     $group: {
    //       _id: { $toUpper: '$category' },
    //       totalCount: { $sum: 1 },
    //       priceAvg: { $avg: '$price' },
    //       ratingAvg: { $avg: '$rating' },
    //       minPrice: { $min: '$price' },
    //       maxPrice: { $max: '$price' },
    //       stock: { $sum: '$stock' },
    //     },
    //   },
    //   {
    //     $sort: { ratingAvg: 1 },
    //   },
    //   {
    //     $match: {
    //       _id: { $ne: '$MOTORCYCLE' },
    //     },
    //   },
    // ]);
    return await ProductModel.findOne({
      attributes: [],
      raw: true,
    });
  } catch (error) {
    throw new Error('ERROR');
  }
};

const productService = {
  getDummyProducts,
  getProducts,
  getProductById,
  getProductStats,
};
export default productService;
