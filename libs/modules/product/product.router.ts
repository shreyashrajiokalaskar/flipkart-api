import { Router } from "express";
import reviewController from "../review/review.controller";
import authService from "../auth/auth.service";
import ReviewRouter from "../review/review.router";
import ProductController from "./product.controller";

// const getProducts = async (req:any, res:any, next:any) => {};
const productRouter = Router();

productRouter.use("/:id/reviews", ReviewRouter);

// Making this API open for all
productRouter.get("", ProductController.getProducts);

productRouter.get(
  "/stats",
  authService.AuthGuard,
  authService.checkRole("ADMIN"),
  ProductController.getStats
);
productRouter.get("/:id", authService.AuthGuard, ProductController.getProductById);

// productRouter.post(
//   '/:id/reviews',
//   authService.AuthGuard,
//   authService.getUser,
//   authService.checkRole('USER'),
//   reviewController.createReview
// );

export default { productRouter };
