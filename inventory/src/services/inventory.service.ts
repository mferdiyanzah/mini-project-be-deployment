import { Kafka } from "kafkajs";
import inventoryRepository from "../repositories/inventory.repository";

const kafka: Kafka = new Kafka({
  clientId: "bukabapak-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "kafka",
  heartbeatInterval: 1000,
  maxBytesPerPartition: 1000000,
});

const producer = kafka.producer({
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

const runInventory = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "inventory_topic",
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
        console.log(order);
        processOrder(order);
      }
    },
  });
}

const processOrder = async (order: any): Promise<void> => {
  try {
    console.log("Processing order: ", order);
    await producer.connect();

    const result = {
      ...order,
      status: "success",
    }

    await producer.send({
      topic: "order_topic",
      messages: [{ value: JSON.stringify(result) }],
      acks: 1,
    });

    await producer.disconnect();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const checkProduct = async (order: any): Promise<boolean> => {
  return inventoryRepository.checkProduct(order) as Promise<boolean>;
}

const reduceProduct = async (order: any): Promise<void> => {
  return inventoryRepository.reduceProduct(order) as Promise<void>;
}

const inventoryService = {
  checkProduct,
  reduceProduct,
};

export default inventoryService;