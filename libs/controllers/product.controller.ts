import { Request, Response } from "express";
import productService from "../routes/product/product.service";
import { redisConnection } from "../configs/redis-connection.config";
import { Product } from "../entities/product.entity";
import { connectionManager } from "configs/db-connection.config";

const getProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) req.query["id"] = id;
    // const products = await productService.getProducts(req.query);
    const products = await connectionManager.getRepo(Product).find({
      relations: ['category'],
    });
    res.status(200).json({
      data: { products, totalCount: products.length },
      status: 200,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await productService.getProductStats();
    res.status(200).json({ data: { stats }, status: 200 });
  } catch (error: any) {
    throw new Error(error);
  }
};

// const getProductById = handler.getOne(ProductModel, {
//   path: 'reviews',
// });
const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let products;
    // const productFromCache = await redisConnection.redis.get(`product:${id}`);
    if (false) {
      // console.log("FETCHING FROM REDIS");
      // products = JSON.parse(productFromCache);
    } else {
      products = await connectionManager.getRepo(Product).findOne({
        where: {id},
        relations: ["category"]
      });
      products = {...products};
      // redisConnection.redis.set(
      //   `product:${id}`,
      //   JSON.stringify(products)
      // );
      console.log("FETCHING FROM DB");
    }
    if (products) {
      res.status(200).json({ data: products, status: 200 });
    } else res.status(404).json({ data: "Product not found!!!", status: 404 });
  } catch (error: any) {
    throw new Error(error);
  }
};

// const getProductReviews = async (req:any, res:any, next:any) => {
//   try {
//     const reviews = await reviewController.createReview();
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

const ProductController = {
  getProducts,
  getStats,
  getProductById,
  // getProductReviews,
};

export default ProductController;
