import { AuthService } from "@modules/auth/auth.service";
import { Router } from "express";
import { OrderController } from "./order.controller";
import { createOrderValidation, getProductIdValidation } from "./order.validation";
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
