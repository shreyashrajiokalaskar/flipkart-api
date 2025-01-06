import { Router } from "express";
import { createOrder, getProductId } from "./order.validation";
import { AuthService } from "modules/auth/auth.service";
import { OrderController } from "./order.controller";
const orderRouter = Router();

orderRouter.post(
  "",
  AuthService.AuthGuard,
  createOrder,
  OrderController.createOrder
);

orderRouter.get("", AuthService.AuthGuard, OrderController.getOrder);
orderRouter.get(
  "/:id",
  AuthService.AuthGuard,
  getProductId,
  OrderController.getOrder
);

export default orderRouter;
