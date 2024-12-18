import { connectionManager } from "configs/db-connection.config"
import { Category } from "entities/category.entity"
import { Request, Response } from "express";

const getCategories = async (req: Request, res: Response)=> {
    console.log("FETCHING CATEGORIES")
    const categories = await connectionManager.getRepo(Category).find();
    res.status(200).json({
        data: { categories, totalCount: categories?.length },
        status: 200,
      });
}

const CategoryController = {
    getCategories
}


export default CategoryController;