import { AddOrderRequest } from "../models/order.model";
import orderRepository from "../repositories/order.repository";
import consumer from "../utils/consumer";

const inventoryConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "inventory_topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: String(message.value),
      });
    },
  });
};

const create = async (order: AddOrderRequest): Promise<number> => {
  return orderRepository.create(order);
};

const orderService = {
  create,
};

export default orderService;
