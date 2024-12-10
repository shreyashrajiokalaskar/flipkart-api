import { Router } from "express";
import authService from "../auth/auth.service";
import OrderController from "./order.controller";
import { createOrder, getProductId } from "./order.validation";
const orderRouter = Router();

orderRouter.post(
  "",
  authService.AuthGuard,
  createOrder,
  OrderController.createOrder
);

orderRouter.get("", authService.AuthGuard, OrderController.getOrder);
orderRouter.get(
  "/:id",
  authService.AuthGuard,
  getProductId,
  OrderController.getOrder
);

export default orderRouter;
