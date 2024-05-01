import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
  clientId: "bukabapak-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const orderKafka = async (res: any) => {
  await producer.connect();

  await producer.send({
    topic: "auth_topic",
    messages: [{
      value: JSON.stringify(res),
    }]
  });
}

const producerKafka = {
  orderKafka
}

export default producerKafka