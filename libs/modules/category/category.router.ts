import { Router } from "express";
import { CategoryController } from "./category.controller";

// const getProducts = async (req:any, res:any, next:any) => {};
const categoryRouter = Router();
// Making this API open for all
categoryRouter.get("", CategoryController.getCategories);
categoryRouter.get("/:id", CategoryController.getProductsByCategory);


export default categoryRouter;
