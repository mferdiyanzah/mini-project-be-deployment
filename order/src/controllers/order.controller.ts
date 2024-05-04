import { Request, Response } from 'express';
import orderService from '../services/order.service';

const create = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    await orderService.sendOrderToInventory(order);


    res.json({ message: 'Order sent to inventory' });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

const health = (req: Request, res: Response) => {
  res.json({ status: 'Order service is running' });
};

export default {
  create,
  health,
};