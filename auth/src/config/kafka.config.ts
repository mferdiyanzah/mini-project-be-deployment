import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
  clientId: "auth_topic",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const runKafka = async () => {
  await producer.connect();

  await producer.send({
    topic: "auth_topic",
    messages: [
      {
        value: "Hello from auth service",
      },
    ],
  });
  console.log("Message sent successfully");
}

export default runKafka;