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

// const orderProducer = async (message: string) => {
//   await producer.connect();
//   await producer.send({
//     topic: "order_topic",
//     messages: [{ value: message }],
//     acks: 1,
//   });
// };

export default producer;
