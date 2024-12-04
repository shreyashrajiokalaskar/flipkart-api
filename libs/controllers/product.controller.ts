import { Request, Response } from "express";
import productService from "../routes/product/product.service";
// import  Product  from "../models/product.model";
import db from "../models"; // Adjust path as necessary
import { redisConnection } from "../configs/redis-connection.config";
const { Product, Category } = db;

const getProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) req.query["id"] = id;
    const products = await productService.getProducts(req.query);
    const cleanedProducts = [...JSON.parse(JSON.stringify(products))];
    res.status(200).json({
      data: { products: cleanedProducts, totalCount: products.length },
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
    const productFromCache = await redisConnection.redis.get(`product:${id}`);
    if (productFromCache) {
      console.log("FETCHING FROM REDIS");
      products = JSON.parse(productFromCache);
    } else {
      products = await Product.findByPk(id, {
        include: {
          model: Category,
          as: "category",
        },
      });
      products = {...products.dataValues};
      redisConnection.redis.set(
        `product:${id}`,
        JSON.stringify(products)
      );
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
