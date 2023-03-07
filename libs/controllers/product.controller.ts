import { Request, Response } from "express";
import { ProductModel } from "../routes/product/product.model";
import productService from "../routes/product/product.service";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProducts(req.query);
    res
      .status(200)
      .json({ data: { products, totalCount: products.length }, status: 200 });
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
    const products = await ProductModel.findByPk(id);
    if (products?.dataValues)
      res.status(200).json({ data: products?.dataValues, status: 200 });
    else res.status(404).json({ data: "Product not found!!!", status: 404 });
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
