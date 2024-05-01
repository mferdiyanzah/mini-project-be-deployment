import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
  clientId: "bukabapak-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const orderProducer = async (message: string) => {
  await producer.connect();
  await producer.send({
    topic: "order_topic",
    messages: [{ value: message }],
  });
};

export default orderProducer;
