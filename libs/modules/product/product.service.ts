import { connectionManager } from "@configs/db-connection.config";
import axios from "axios";
import handler from "../../controllers/handler.factory";
import { Category } from "../../entities/category.entity";
import { Product } from "../../entities/product.entity";
import { APIModifier } from "../../utils/api-features.util";
import { ProductFilterDto } from "./product.dto";

export class ProductService {
  public static getDummyProducts = async () => {
    try {
      const products = await axios.get(
        "https://dummyjson.com/products?skip=0&limit=300",
        {
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "identity",
          },
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
        const productCreated = (await this.setDummyProducts(product)) as any;
        return productCreated;
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  public static setDummyProducts = async (product: any) => {
    try {
      return await Product.create(product).save();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  public static getProducts = async (filterParams?: any) => {
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
        relations: ["category"],
        ...features,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  public static getProductById = handler.getOne(Product, {
    path: "reviews",
  });

  public static getProductStats = async () => {
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
      return await Product.findOne({});
    } catch (error) {
      throw new Error("ERROR");
    }
  };

  public static async filterProducts(filterOptions: ProductFilterDto) {
    const productsRepo = connectionManager.getRepo(Product);
    const filteredProducts = productsRepo.createQueryBuilder("product").leftJoinAndSelect("product.category", "category");
    if (filterOptions.category) {
      filteredProducts.where({
        categoryId: filterOptions.category
      })
    }

    if (filterOptions.brand) {
      filteredProducts.where({
        brand: filterOptions.brand,
      })
    }
    return filteredProducts.getMany();
  };
}
