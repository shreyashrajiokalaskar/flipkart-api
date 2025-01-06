import { Router } from "express";
import ReviewRouter from "../review/review.router";
import { AuthService } from "modules/auth/auth.service";
import { ProductController } from "./product.controller";

// const getProducts = async (req:any, res:any, next:any) => {};
const productRouter = Router();

productRouter.use("/:id/reviews", ReviewRouter);

// Making this API open for all
productRouter.get("", ProductController.getProducts);

productRouter.get(
  "/stats",
  AuthService.AuthGuard,
  AuthService.checkRole("ADMIN"),
  ProductController.getStats
);
productRouter.get("/:id", AuthService.AuthGuard, ProductController.getProductById);

// productRouter.post(
//   '/:id/reviews',
//   AuthService.AuthGuard,
//   AuthService.getUser,
//   AuthService.checkRole('USER'),
//   reviewController.createReview
// );

export default { productRouter };
