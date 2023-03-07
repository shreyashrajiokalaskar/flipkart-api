import { Router } from 'express';
import authService from '../auth/auth.service';
import OrderController from './order.controller';
const orderRouter = Router();

orderRouter.post('', authService.AuthGuard, OrderController.createOrder);

orderRouter.get('', authService.AuthGuard, OrderController.getOrder);

export default orderRouter;
