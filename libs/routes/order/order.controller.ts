// import { Order } from "../../entities/order.entity";

import { Order } from "entities/order.entity";


const createOrder = async (req: any, res: any, next: any) => {
  try {
    const orderDetails = req.body;
    const order = await Order.create({ ...orderDetails });
    res.status(201).json({
      data: { order, totalCount: 1 },
      status: 201,
    });
  } catch (error: any) {
    res.status(400).json({ data: error.message, status: 400 });
  }
};

const getOrder = async (req: any, res: any, next: any) => {
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
    res.status(200).json({
      data: { orders, totalCount: orders.length },
      status: 200,
    });
  } catch (error: any) {
    res.status(400).json({ data: error.message, status: 400 });
  }
};

const OrderController = {
  createOrder,
  getOrder,
};

export default OrderController;
