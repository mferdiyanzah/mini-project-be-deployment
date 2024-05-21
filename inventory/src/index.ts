import express, { Express } from "express";
import rabbitConsumer from "./services/rabbit.service";
import kafkaService from "./services/kafka.service";
const app: Express = express();

app.use(express.json());

app.listen(3003, async () => {
  console.log("Inventory service listening on port 3003");
  await kafkaService.kafkaConsumer().catch(console.error);
  await rabbitConsumer();
});