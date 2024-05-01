import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
  clientId: "bukabapak-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const runKafka = async (res: any) => {
  await producer.connect();

  await producer.send({
    topic: "auth_topic",
    messages: [{
      value: JSON.stringify(res),
    }]
  });
}

export default runKafka;