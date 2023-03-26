import { Request, Response } from 'express';
import { ProductModel } from '../routes/product/product.model';
import productService from '../routes/product/product.service';

const getProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) req.query['id'] = id;
    const products = await productService.getProducts(req.query);
    const cleanedProducts = [...JSON.parse(JSON.stringify(products.products))];
    cleanedProducts.forEach((product: any) => {
      const image = product?.image?.images;
      delete product.image;
      product['images'] = image;
      product['thumbnail'] = image[0];
    });
    res.status(200).json({
      data: { products: cleanedProducts, totalCount: products.totalCount },
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
    const products = await ProductModel.findByPk(id);
    if (products?.dataValues)
      res.status(200).json({ data: products?.dataValues, status: 200 });
    else res.status(404).json({ data: 'Product not found!!!', status: 404 });
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
