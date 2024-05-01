import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
  clientId: "bukabapak-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "kafka" });

const auth = async () => {
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

const consumerKafka = {
  auth
}

export default consumerKafka;