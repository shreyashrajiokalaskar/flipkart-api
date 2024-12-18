import CategoryController from "controllers/category.controller";
import { Router } from "express";

// const getProducts = async (req:any, res:any, next:any) => {};
const categoryRouter = Router();
// Making this API open for all
categoryRouter.get("", CategoryController.getCategories);

export default categoryRouter;
