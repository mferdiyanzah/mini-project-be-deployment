import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
  clientId: "bukabapak-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "kafka",
  heartbeatInterval: 3000,
  maxBytesPerPartition: 1000000,
});

// const inventoryConsumer = async () => {
//   await consumer.connect();
//   await consumer.subscribe({ topic: "inventory_topic", fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log({
//         topic,
//         partition,
//         offset: message.offset,
//         value: String(message.value),
//       });

//       const order = JSON.parse(String(message.value));
//       await orderService.create(order);
//     },
//   });
// };

export default consumer;
