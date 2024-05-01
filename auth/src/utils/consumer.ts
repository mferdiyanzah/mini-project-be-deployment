import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
  clientId: "bukabapak",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "kafka" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "auth_topic" });

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

export default runConsumer;