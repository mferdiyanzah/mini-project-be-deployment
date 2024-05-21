import { Request, Response } from 'express';
import orderService from '../services/order.service';
import rabbit from '../utils/rabbit';
import { resolve } from 'path';
import kafkaService from '../services/kafka.service';

const create = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const channel = await rabbit();
    const createOrderQueue = await channel.assertQueue('', { exclusive: true });
    channel.sendToQueue(
      'inventory_check_queue',
      Buffer.from(JSON.stringify(order)),
      { replyTo: createOrderQueue.queue }
    );

    const orderResponse = new Promise((resolve, reject) => {
      channel.consume(createOrderQueue.queue, (message) => {
        if (message !== null) {
          const orderResponse = JSON.parse(message.content.toString());
          resolve(orderResponse);
          channel.deleteQueue(createOrderQueue.queue);
        }
      });
    });

    const response = await orderResponse as any;

    const message = {
      topic: 'send_notification_topic',
      data: order,
    }
    if (response.isAvailable) {
      await kafkaService.sendNotificationProducer(message);
      res.status(201).json({ message: 'Order created' });
    } else {
      res.status(400).json({ message: 'Product is not available' });
    }


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