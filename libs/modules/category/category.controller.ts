import { connectionManager } from "configs/db-connection.config";
import { Category } from "entities/category.entity";
import { Product } from "entities/product.entity";
import { Request, Response } from "express";
import { controllerHandler } from "utils/common-handler";
import CommonError, { ICustomError } from "utils/error.common";
import { successResponse } from "utils/success.response";

export class CategoryController {
  public static getCategories = controllerHandler(
    async (req: Request, res: Response) => {
      try {
        const categories = await connectionManager.getRepo(Category).find();
        if (!categories.length) {
          const errorModified = {
            message: "Not categories found!!!",
            statusCode: 404,
          };
          throw new CommonError(errorModified);
        }
        successResponse(res, 200, "", categories, categories.length);
      } catch (error) {
        throw new CommonError(error as ICustomError);
      }
    }
  );

  public static getProductsByCategory = controllerHandler(
    async (req: Request, res: Response) => {
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
        successResponse(res, 200, "", products, products.length);
      } catch (error) {
        throw new CommonError(error as ICustomError);
      }
    }
  );
}
