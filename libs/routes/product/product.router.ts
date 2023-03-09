import { Router } from "express";
import ProductController from "../../controllers/product.controller";
import reviewController from "../../controllers/review.controller";
import authService from "../auth/auth.service";
import ReviewRouter from "../review/review.router";

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
productRouter.get("/:id", authService.AuthGuard, ProductController.getProducts);

// productRouter.post(
//   '/:id/reviews',
//   authService.AuthGuard,
//   authService.getUser,
//   authService.checkRole('USER'),
//   reviewController.createReview
// );

export default { productRouter };
