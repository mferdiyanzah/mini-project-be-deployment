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

export default consumer;
