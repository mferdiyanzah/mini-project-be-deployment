import { Kafka } from "kafkajs";

const kafka: Kafka = new Kafka({
  brokers: ["pkc-ew3qg.asia-southeast2.gcp.confluent.cloud:9092"],
  clientId: "lkc-jz88gm",
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: "U7ONXWZAMW5GSO77",
    password: "rwvXztBof97s20eMsPWbtbjVe/hMJTbe2IyfpwrHtpygtR2FFRhSRA+sdgjCdlLW",
  },
});

export default kafka;
