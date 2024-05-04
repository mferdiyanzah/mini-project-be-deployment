import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
  clientId: "bukabapak-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer({
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

export default producer;
