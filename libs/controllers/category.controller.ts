import { connectionManager } from "configs/db-connection.config";
import { Category } from "entities/category.entity";
import { Product } from "entities/product.entity";
import { Request, Response } from "express";
import CommonError, { ICustomError } from "utils/error.common";

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await connectionManager.getRepo(Category).find();
    if (!categories.length) {
      const errorModified = {
        message: "Not categories found!!!",
        statusCode: 404,
      };
      throw new CommonError(errorModified);
    }
    res.status(200).json({
      data: { categories, totalCount: categories?.length },
      status: 200,
    });
  } catch (error) {
    throw new CommonError(error as ICustomError);
  }
};

const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await connectionManager.getRepo(Product).find({
      where: {
        categoryId: id,
      },
      relations: ["category"],
    });
    if (!products.length) {
      const errorModified = {
        message: "Category Not Found!!!",
        statusCode: 404,
      };
      throw new CommonError(errorModified);
    }
    res
      .status(200)
      .json({ data: products, totalCount: products.length, status: 200 });
  } catch (error) {
    throw new CommonError(error as ICustomError);
  }
};

const CategoryController = {
  getCategories,
  getProductsByCategory,
};

export default CategoryController;
