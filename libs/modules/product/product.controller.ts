import { Request, Response } from "express";
import { connectionManager } from "configs/db-connection.config";
import { Product } from "entities/product.entity";
import { controllerHandler } from "utils/common-handler";
import { ProductService } from "./product.service";
import { successResponse } from "utils/success.response";
import { errorResponse } from "utils/error.common";

export class ProductController {
  public static getProducts = controllerHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      if (id) req.query["id"] = id;
      // const products = await ProductService.getProducts(req.query);
      const products = await connectionManager.getRepo(Product).find({
        relations: ["category"],
      });
      successResponse(res, 200, products, products.length);
    }
  );

  public static getStats = controllerHandler(
    async (req: Request, res: Response) => {
      const stats = await ProductService.getProductStats();
      res.status(200).json({ data: { stats }, status: 200 });
      successResponse(res, 200, stats, 1);
    }
  );

  // const getProductById = handler.getOne(ProductModel, {
  //   path: 'reviews',
  // });
  public static getProductById = controllerHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      let products;
      // const productFromCache = await redisConnection.redis.get(`product:${id}`);
      if (false) {
        // console.log("FETCHING FROM REDIS");
        // products = JSON.parse(productFromCache);
      } else {
        products = await connectionManager.getRepo(Product).findOne({
          where: { id },
          relations: ["category"],
        });
        products = { ...products };
        // redisConnection.redis.set(
        //   `product:${id}`,
        //   JSON.stringify(products)
        // );
        console.log("FETCHING FROM DB");
      }
      if (products) {
        successResponse(res, 200, products, 1);
      } else {
        return errorResponse(res, 404, "Product not found!!!");
      }
    }
  );

  // const getProductReviews = async (req:any, res:any, next:any) => {
  //   try {
  //     const reviews = await reviewController.createReview();
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // };
}
