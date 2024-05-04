import { Kafka } from "kafkajs";
import { AddOrderRequest } from "../models/order.model";
import orderRepository from "../repositories/order.repository";

const kafka: Kafka = new Kafka({
  clientId: "bukabapak-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "kafka-order",
  heartbeatInterval: 1000,
  maxBytesPerPartition: 1000000,
});

const producer = kafka.producer({
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

const sendOrderToInventory = async (order: AddOrderRequest): Promise<void> => {
  await producer.connect();
  await producer.send({
    topic: "inventory_topic",
    messages: [{ value: JSON.stringify(order) }],
    acks: 1,
  }).catch(console.error);
  await producer.disconnect();
}


const processOrder = async (order: AddOrderRequest): Promise<void> => {
  try {
    console.log("Add order: ", order);
    await orderRepository.create(order);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const runOrder = async () => {
  console.log("Order service is up and running");
  try {
    await consumer.connect();

    await consumer.subscribe({
      topic: "order_topic",
      fromBeginning: true, // consume messages from the beginning
    });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: String(message.value),
        });
        if (message.value !== null) {
          const order = JSON.parse(message.value.toString());
          await processOrder(order);
        }
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in runOrder:', error.message);
      console.error(error.stack);
    }
  }
}

const orderService = {
  sendOrderToInventory,
  runOrder,
};

export default orderService;
