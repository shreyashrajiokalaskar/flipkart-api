import { Router } from "express";
import ReviewRouter from "../review/review.router";
import { AuthService } from "modules/auth/auth.service";
import { ProductController } from "./product.controller";
import { DtoValidator } from "utils/common-handler";
import { ProductFilterDto } from "./product.dto";

// const getProducts = async (req:any, res:any, next:any) => {};
const productRouter = Router();

productRouter.post(
  "/filter",
  DtoValidator(ProductFilterDto),
  ProductController.filterProducts
);

productRouter.use("/:id/reviews", ReviewRouter);

// Making this API open for all
productRouter.get("", AuthService.AuthGuard, ProductController.getProducts);

productRouter.get(
  "/stats",
  AuthService.AuthGuard,
  AuthService.checkRole("ADMIN"),
  ProductController.getStats
);
productRouter.get(
  "/:id",
  AuthService.AuthGuard,
  ProductController.getProductById
);

// productRouter.post(
//   '/:id/reviews',
//   AuthService.AuthGuard,
//   AuthService.getUser,
//   AuthService.checkRole('USER'),
//   reviewController.createReview
// );

export default { productRouter };
