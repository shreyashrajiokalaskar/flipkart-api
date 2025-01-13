import { Router } from "express";
import { createOrderValidation, getProductIdValidation } from "./order.validation";
import { AuthService } from "modules/auth/auth.service";
import { OrderController } from "./order.controller";
const orderRouter = Router();

orderRouter.post(
  "",
  AuthService.AuthGuard,
  createOrderValidation,
  OrderController.createOrder
);

orderRouter.get("", AuthService.AuthGuard, OrderController.getOrder);
orderRouter.get(
  "/:id",
  AuthService.AuthGuard,
  getProductIdValidation,
  OrderController.getOrder
);

export default orderRouter;
