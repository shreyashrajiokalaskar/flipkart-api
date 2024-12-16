import axios from "axios";
import handler from "../../controllers/handler.factory";
import { APIModifier } from "../../utils/api-features.util";
import { Category } from "../../entities/category.entity";
import { Product } from "../../entities/product.entity";

const getDummyProducts = async () => {
  try {
    const products = await axios.get(
      "https://dummyjson.com/products?skip=30&limit=100",
      {
        headers: { Accept: "application/json", "Accept-Encoding": "identity" },
      }
    );
    products.data.products.forEach(async (product: any) => {
      delete product.id;
      const category = await Category.findOne({
        where: { slug: product.category },
      });
      product.categoryId = category?.id;
      delete product.thumbnail;
      delete product.images;
      // const productCreated = (await setDummyProducts(product)) as any;
      // return productCreated;
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

const setDummyProducts = async (product: any) => {
  try {
    return await Product.create(product);
  } catch (error: any) {
    throw new Error(error);
  }
};

const getProducts = async (filterParams?: any) => {
  try {
    filterParams.sortBy = "price";
    filterParams.order = "DESC";
    filterParams.pageSize = 100;

    const features = new APIModifier(filterParams)
      .sort()
      .limitFields()
      .paginate().filterClause;

    const whereClause: { [key: string]: string } = {};
    if (filterParams.id) whereClause["id"] = filterParams.id;
    return await Product.find({
      // include: ImageModel,
      where: whereClause,
      relations: ['category'],
      ...features,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

const getProductById = handler.getOne(Product, {
  path: "reviews",
});
// async (id: string) => {
//   try {
//     return await ProductCollection.Product.find({ _id: id }).populate(
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
    return await Product.findOne({
    });
  } catch (error) {
    throw new Error("ERROR");
  }
};

const productService = {
  getDummyProducts,
  getProducts,
  getProductById,
  getProductStats,
};
export default productService;
