import { Order } from "@entities/order.entity";
import { controllerHandler } from "libs/utils/common-handler";
import { successResponse } from "libs/utils/success.response";


export class OrderController {
  public static createOrder = controllerHandler(async (req: any, res: any, next: any) => {
    try {
      const orderDetails = req.body;
      const order = await Order.create({ ...orderDetails });
      successResponse(res, 201, order, 1)
    } catch (error: any) {
      res.status(400).json({ data: error.message, status: 400 });
    }
  });

  public static getOrder = controllerHandler(async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      let orders = [] as any;
      if (id) {
        orders = await Order.findBy(id);
      } else {
        orders = await Order.find();
      }
      // .populate({ path: 'userId', select: '-password' })
      // .populate('products')
      // .exec();
      successResponse(res, 200, orders, orders.length)
    } catch (error: any) {
      res.status(400).json({ data: error.message, status: 400 });
    }
  });
}
