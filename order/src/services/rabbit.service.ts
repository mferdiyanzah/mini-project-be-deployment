import { OrderModel } from "../models/order.model";
import { Queue } from "../models/rabbit.model";

interface Channel {
  assertQueue: (queue: string, options: { exclusive: boolean }) => Promise<Queue>;
  sendToQueue: (queue: string, content: Buffer, options: { replyTo: string }) => void;
  consume: (queue: string, callback: (message: any) => void) => void;
  deleteQueue: (queue: string) => void;
}

const createOrderQueue = async (channel: Channel, order: OrderModel): Promise<Queue> => {
  const queue = await channel.assertQueue('', { exclusive: true });
  channel.sendToQueue('inventory_check_queue', Buffer.from(JSON.stringify(order)), { replyTo: queue.queue });
  return queue;
};

const consumeOrderResponse = (channel: Channel, queue: Queue): Promise<Boolean> => new Promise((resolve, reject) => {
  channel.consume(queue.queue, (message) => {
    if (message !== null) {
      const orderResponse = JSON.parse(message.content.toString()) as Boolean;
      resolve(orderResponse);
      channel.deleteQueue(queue.queue);
    } else {
      reject(new Error('No message received from queue'));
    }
  });
});

const rabbitService = {
  createOrderQueue,
  consumeOrderResponse,
};

export default rabbitService;